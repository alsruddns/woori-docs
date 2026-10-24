import json
import re
import sys
from pathlib import Path

import argostranslate.translate as translate

ROOT = Path(__file__).resolve().parents[1]
SOURCE = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
LOCALES = ["tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"]
MODEL_LOCALE = {"fil": "tl"}
PREFIX = {
    "titles": "Translate: ",
    "fields": "Translate: ",
    "interface": "Translate: ",
    "categories": "Translate: ",
    "ui": "Translate: ",
    "chrome": "Translate: ",
    "editor": "Translate: ",
    "documentContent": "Translate: ",
}

def slot_tokens(value):
    return re.findall(r"\{\w+\}", str(value))

def protect(value):
    slots = []
    protected = re.sub(r"\{(\w+)\}", lambda match: slots.append(match.group(0)) or f"<x{len(slots)-1}>", value)
    return protected, slots

def restore(value, slots):
    for index, slot in enumerate(slots):
        value = value.replace(f"<x{index}>", slot)
    return value.strip()

def translate_with_slots(value, target):
    protected, slots = protect(value)
    result = translate.translate(protected, "en", target)
    result = restore(result, slots)
    missing = [slot for slot in slots if result.count(slot) < value.count(slot)]
    if missing:
        result = f"{result.rstrip()} {' '.join(missing)}"
    return result

def contextual_retry(value, section, target):
    protected, slots = protect(PREFIX[section] + value)
    translated = restore(translate.translate(protected, "en", target), slots)
    if ":" not in translated:
        return value
    candidate = translated.split(":", 1)[1].strip()
    if not candidate or candidate == value:
        return value
    return candidate

def walk_pair(source, output, section, target, stats):
    if isinstance(source, dict):
        for key, value in source.items():
            output[key] = walk_pair(value, output[key], section, target, stats)
    elif isinstance(source, list):
        for index, value in enumerate(source):
            output[index] = walk_pair(value, output[index], section, target, stats)
    elif isinstance(source, str):
        if not source:
            return
        if output == source:
            output = contextual_retry(source, section, target)
            stats["contextualRetries"] += 1
        expected = slot_tokens(source)
        expected_counts = {slot: expected.count(slot) for slot in set(expected)}
        seen = {}
        def keep_expected(match):
            slot = match.group(0)
            seen[slot] = seen.get(slot, 0) + 1
            if seen[slot] <= expected_counts.get(slot, 0):
                return slot
            stats["removedExtraSlots"] += 1
            return ""
        output = re.sub(r"\{\w+\}", keep_expected, output)
        actual = slot_tokens(output)
        for slot in expected:
            if actual.count(slot) < expected_counts[slot]:
                output = f"{output.rstrip()} {slot}"
                actual = slot_tokens(output)
                stats["restoredSlots"] += 1
        if output == source:
            stats["englishCopies"] += 1
        stats["strings"] += 1
        return output
    return output

for locale in LOCALES:
    target = MODEL_LOCALE.get(locale, locale)
    path = ROOT / "docs" / "i18n-drafts" / f"{locale}.json"
    draft = json.loads(path.read_text(encoding="utf-8"))
    stats = {"strings": 0, "contextualRetries": 0, "restoredSlots": 0, "removedExtraSlots": 0, "englishCopies": 0}
    for section, source_values in SOURCE.items():
        translated = draft[section]
        if isinstance(source_values, dict):
            for key, value in source_values.items():
                result = walk_pair(value, translated[key], section, target, stats)
                if result is not None:
                    translated[key] = result
        else:
            result = walk_pair(source_values, translated, section, target, stats)
            if result is not None:
                draft[section] = result
    draft["reviewStatus"] = "machine-translated draft; editorial review required; unpublished"
    draft["draftAudit"] = stats
    path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{locale}: " + json.dumps(stats) + "; unpublished", flush=True)

import json
import os
import re
import sys
from pathlib import Path

import argostranslate.translate as translate

ROOT = Path(__file__).resolve().parents[1]
SOURCE_PATH = Path(sys.argv[1])
LOCALES = ["tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"]
MODEL_LOCALE = {"fil": "tl"}
source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))

def protect_and_translate(value, target):
    if not value:
        return value
    slots = []
    protected = re.sub(r"\{(\w+)\}", lambda match: slots.append(match.group(0)) or f"<x{len(slots)-1}>", value)
    result = translate.translate(protected, "en", target)
    for index, slot in enumerate(slots):
        result = result.replace(f"<x{index}>", slot)
    return result.strip()

def translate_tree(value, target, previous=None):
    if isinstance(value, dict):
        previous = previous if isinstance(previous, dict) else {}
        return {key: translate_tree(child, target, previous.get(key)) for key, child in value.items()}
    if isinstance(value, list):
        previous = previous if isinstance(previous, list) else []
        return [translate_tree(child, target, previous[index] if index < len(previous) else None) for index, child in enumerate(value)]
    if not isinstance(value, str):
        raise TypeError(f"Unexpected source value: {type(value)}")
    if previous is not None and previous != "":
        return previous
    return protect_and_translate(value, target)

def count_leaves(value):
    if isinstance(value, dict):
        return sum(count_leaves(child) for child in value.values())
    if isinstance(value, list):
        return sum(count_leaves(child) for child in value)
    return 1

for locale in LOCALES:
    target = MODEL_LOCALE.get(locale, locale)
    output_path = ROOT / "docs" / "i18n-drafts" / f"{locale}.json"
    draft = {}
    if output_path.exists():
        draft = json.loads(output_path.read_text(encoding="utf-8"))
    for section, values in source.items():
        draft[section] = translate_tree(values, target, draft.get(section))
        output_path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    draft["translationSources"] = {section: f"Argos Translate offline model en-to-{target}; machine draft" for section in source}
    if locale == "tr":
        draft["translationSources"]["fields"] = "MyMemory free anonymous API (422 entries) plus 3 manual field translations; machine draft"
        draft["source"] = "Mixed offline/free machine translation draft; unreviewed"
    else:
        draft["source"] = f"Argos Translate offline model en-to-{target}; machine draft"
    draft["reviewStatus"] = "machine-translated draft; unreviewed; unpublished"
    draft["draftCounts"] = {section: count_leaves(draft[section]) for section in source}
    draft["reviewedCounts"] = {section: 0 for section in source}
    draft["modelLocale"] = target if target != locale else None
    output_path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{locale}: " + ", ".join(f"{key}={value}" for key, value in draft["draftCounts"].items()) + "; unpublished", flush=True)

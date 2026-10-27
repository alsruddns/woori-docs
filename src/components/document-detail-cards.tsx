import { detailHeadings } from "../lib/document-detail-copy";
import type { buildDocumentContent } from "../lib/document-content";
import type { Locale } from "../lib/template-schema";

type Content = ReturnType<typeof buildDocumentContent>;

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return <section className={`detail-card ${className}`}><h2>{title}</h2>{children}</section>;
}

/** Server-rendered editorial content kept separate from the interactive editor. */
export function DocumentDetailCards({ content, locale }: { content: Content; locale: Locale }) {
  const labels = detailHeadings[locale];
  return <div className="detail-cards">
    <Card title={content.headings.overview}>
      <p>{content.intro}</p><p>{content.purpose}</p>
      <h3>{content.headings.audience}</h3><p>{content.audience}</p>
    </Card>
    <Card title={content.headings.steps}>
      <p>{content.steps}</p><p>{content.tips}</p>
    </Card>
    <Card title={labels.example}>
      <p>{content.example}</p>
    </Card>
    <Card title={labels.format}>
      <p>{content.structure}</p><p>{content.input}</p><p>{content.output}</p>
    </Card>
    <Card title={labels.limits}>
      <p>{content.caution}</p><p>{content.limitations}</p><p>{content.source}</p>
    </Card>
    <Card title={labels.troubleshooting}>
      <p>{content.troubleshooting}</p>
    </Card>
    <Card title={labels.faq} className="detail-faq">
      {content.faq.map((item) => <div className="detail-faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </Card>
  </div>;
}

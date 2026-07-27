import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";

type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalDocumentProps = {
  label: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalDocument({
  label,
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalDocumentProps) {
  return (
    <SiteShell>
      <PageHero label={label} title={title} subtitle={subtitle} />
      <section className="section-main py-12 sm:py-16">
        <div className="cl-container">
          <p className="legal-meta text-sm text-cl-muted">Last updated: {lastUpdated}</p>
          <article className="legal-prose mx-auto mt-8 max-w-3xl">
            {sections.map((section) => (
              <section key={section.title} className="legal-section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </SiteShell>
  );
}

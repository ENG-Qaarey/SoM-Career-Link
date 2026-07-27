type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero relative overflow-hidden border-b border-cl-border/30">
      <div className="hero-bg absolute inset-0" aria-hidden>
        <div className="hero-bg__gradient" />
      </div>
      <div className="cl-container relative z-[1] py-14 sm:py-16 lg:py-20">
        {label && <p className="cl-section-label">{label}</p>}
        <h1 className="cl-heading mt-2 max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="cl-subtext mt-4 max-w-2xl text-base sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

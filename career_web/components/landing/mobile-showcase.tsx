import { routes } from "@/lib/routes";
import { MotionSection } from "@/components/ui/motion-section";
import { MobileAppPhones } from "./mockups";

function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 814 1000"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
      />
    </svg>
  );
}

function GooglePlayLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
    >
      <path fill="#EA4335" d="M2.5 1.4 18.8 17.7 14.1 22.4z" />
      <path
        fill="#FBBC04"
        d="m18.8 14.3 7.4-4.3c.8-.5.8-1.6 0-2.1l-7.4-4.3-4.7 5.4z"
      />
      <path fill="#4285F4" d="M2.5 30.6c.5.3 1.1.2 1.5-.2L18.8 14.3 14.1 9.6z" />
      <path
        fill="#34A853"
        d="M2.5 1.4C1.8.9 1 1.1.5 1.8.2 2.3 0 2.9 0 3.5v25c0 .6.2 1.2.5 1.7.5.7 1.3.9 2 .5L14.1 9.6z"
      />
    </svg>
  );
}

export function MobileShowcase() {
  return (
    <section className="relative overflow-hidden bg-cl-main py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(13,110,253,0.18),transparent_55%)]" />
      <div className="cl-container relative grid items-center gap-12 lg:grid-cols-2">
        <MotionSection>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cl-accent">
            Available on Mobile
          </p>
          <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">
            Your Career. Your Opportunities.
            <br />
            Anywhere.
          </h2>
          <p className="cl-subtext mt-4 max-w-md text-base">
            Discover opportunities, apply, track applications and connect with employers
            directly from your phone.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* Official-style App Store badge */}
            <a
              href={routes.register}
              className="inline-flex h-12 items-center gap-2.5 rounded-[8px] border border-white/20 bg-black px-3.5 py-2 text-white shadow-md transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cl-blue sm:h-[52px] sm:px-4"
              aria-label="Download on the App Store"
            >
              <AppleLogo className="h-7 w-auto shrink-0 sm:h-8" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[9px] font-medium tracking-wide sm:text-[10px]">
                  Download on the
                </span>
                <span className="mt-0.5 text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  App Store
                </span>
              </span>
            </a>

            {/* Official-style Google Play badge */}
            <a
              href={routes.register}
              className="inline-flex h-12 items-center gap-2.5 rounded-[8px] border border-white/20 bg-black px-3.5 py-2 text-white shadow-md transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cl-blue sm:h-[52px] sm:px-4"
              aria-label="Get it on Google Play"
            >
              <GooglePlayLogo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[8px] font-medium uppercase tracking-[0.08em] sm:text-[9px]">
                  Get it on
                </span>
                <span className="mt-0.5 text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </MotionSection>
        <MotionSection delay={0.1}>
          <MobileAppPhones />
        </MotionSection>
      </div>
    </section>
  );
}

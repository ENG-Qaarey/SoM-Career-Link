import Image from "next/image";
import { routes } from "@/lib/routes";
import { MotionSection } from "@/components/ui/motion-section";
import { HeroPhoneCluster } from "./mockups";

const APP_STORE_BADGE = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
const GOOGLE_PLAY_BADGE =
  "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";

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
            Discover opportunities, apply, track applications and connect with
            employers directly from your phone.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={routes.register}
              className="inline-flex items-center rounded-lg transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cl-blue"
              aria-label="Download on the App Store"
            >
              <Image
                src={APP_STORE_BADGE}
                alt="Download on the App Store"
                width={150}
                height={48}
                className="h-12 w-[150px] object-cover"
              />
            </a>

            <a
              href={routes.register}
              className="inline-flex items-center rounded-lg transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cl-blue"
              aria-label="Get it on Google Play"
            >
              <Image
                src={GOOGLE_PLAY_BADGE}
                alt="Get it on Google Play"
                width={150}
                height={48}
                className="h-12 w-[150px] object-cover"
              />
            </a>
          </div>
        </MotionSection>
        <MotionSection delay={0.1}>
          <HeroPhoneCluster />
        </MotionSection>
      </div>
    </section>
  );
}

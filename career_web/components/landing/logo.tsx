import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

type LogoProps = {
  variant?: "default" | "light";
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href={routes.home} className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="brand-icon brand-icon--on-dark h-11 w-11 shrink-0 sm:h-12 sm:w-12">
        <Image
          src="/brand/icon.png"
          alt="CareerLink Somalia"
          width={48}
          height={48}
          className="brand-icon__img"
          priority
        />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.95rem] font-bold tracking-tight text-cl-text sm:text-base">
          CareerLink
        </span>
        <span className="block text-[0.65rem] font-semibold tracking-[0.14em] text-cl-accent sm:text-[0.7rem]">
          SOMALIA
        </span>
      </span>
    </Link>
  );
}

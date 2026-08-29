import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

type AuthShellProps = {
  children: React.ReactNode;
  /** Render children full-width (no centered container / hero background) */
  fullBleed?: boolean;
  /** Show the site footer (default true) */
  footer?: boolean;
  /** Show the site navbar (default true) */
  navbar?: boolean;
};

/** Login / register pages — navbar + content + footer */
export function AuthShell({
  children,
  fullBleed = false,
  footer = true,
  navbar = true,
}: AuthShellProps) {
  return (
    <main className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-cl-main text-cl-text">
      {navbar && <Navbar />}
      {fullBleed ? (
        <div className="relative flex-1">{children}</div>
      ) : (
        <div className="auth-page relative flex flex-1 items-center justify-center">
          <div className="hero-bg absolute inset-0" aria-hidden>
            <div className="hero-bg__gradient" />
          </div>
          <div className="cl-container relative z-[1] w-full py-10 lg:py-14">
            {children}
          </div>
        </div>
      )}
      {footer && <Footer />}
    </main>
  );
}

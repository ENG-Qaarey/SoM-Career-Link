import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

type AuthShellProps = {
  children: React.ReactNode;
};

/** Login / register pages — navbar + centered content + footer */
export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-cl-main text-cl-text">
      <Navbar />
      <div className="auth-page relative overflow-hidden">
        <div className="hero-bg absolute inset-0" aria-hidden>
          <div className="hero-bg__gradient" />
        </div>
        <div className="cl-container relative z-[1] flex justify-center py-12 sm:py-16 lg:py-20">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

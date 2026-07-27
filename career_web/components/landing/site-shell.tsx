import { Navbar } from "./navbar";
import { Footer } from "./footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-cl-main text-cl-text">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

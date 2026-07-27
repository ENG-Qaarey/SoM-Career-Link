import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careerlink.so"),
  title: "CareerLink Somalia | Connect. Grow. Succeed.",
  description:
    "Discover internships, graduate programs, entry-level jobs and career opportunities with CareerLink Somalia.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "CareerLink Somalia | Connect. Grow. Succeed.",
    description:
      "Discover internships, graduate programs, entry-level jobs and career opportunities with CareerLink Somalia.",
    type: "website",
    locale: "en_SO",
    siteName: "CareerLink Somalia",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerLink Somalia | Connect. Grow. Succeed.",
    description:
      "Discover internships, graduate programs, entry-level jobs and career opportunities with CareerLink Somalia.",
  },
  icons: {
    icon: "/brand/icon.png",
  },
};

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('cl-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (prefersLight ? 'light' : 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

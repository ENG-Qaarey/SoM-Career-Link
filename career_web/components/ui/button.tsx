import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "outline-white";
  className?: string;
};

const variants = {
  primary: "cl-btn cl-btn-primary",
  secondary: "cl-btn cl-btn-secondary",
  white: "cl-btn cl-btn-white",
  "outline-white": "cl-btn cl-btn-outline-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}

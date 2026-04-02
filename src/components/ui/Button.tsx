import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200";
  
  const variants = {
    primary: "bg-secondary text-white hover:bg-secondary-600 shadow-md hover:shadow-lg",
    secondary: "bg-primary text-white hover:bg-primary-600 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

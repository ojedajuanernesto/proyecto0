interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        hover ? "hover:shadow-xl transition-shadow duration-300" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

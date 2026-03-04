import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-dark-2 rounded-xl shadow-card p-6 ${className}`}
    >
      {children}
    </div>
  );
}
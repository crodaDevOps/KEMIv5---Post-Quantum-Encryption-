import React from "react";

export const Button = ({
  children,
  variant = "primary",
  onClick
}: {
  children?: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}) => {
  const base =
    "px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border transition-colors duration-200 ease-out";

  const styles =
    variant === "primary"
      ? "bg-coral text-black border-coral hover:bg-white hover:border-white"
      : "bg-transparent text-coral border-coral hover:border-white hover:text-white";

  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>;
};
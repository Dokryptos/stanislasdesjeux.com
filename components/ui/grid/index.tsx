import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-4 tablet:grid-cols-9 laptop:grid-cols-9 desktop:grid-cols-12 ${className}`}
    >
      {children}
    </div>
  );
}

import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-6 tablet:grid-cols-9 laptop:grid-cols-12 gap-3 pl-5 pr-5 tablet:pl-10 tablet:pr-10 ${className}`}
    >
      {children}
    </div>
  );
}

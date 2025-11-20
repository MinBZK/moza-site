import type { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

export function Container({
  children,
  className = "",
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`container mx-auto max-w-[1168px] px-4 py-1 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

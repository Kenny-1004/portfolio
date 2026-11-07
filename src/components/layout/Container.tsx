import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** The site's single horizontal rhythm: 16px gutters on phones, widening to 48px. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-12", className)}>{children}</Tag>;
}

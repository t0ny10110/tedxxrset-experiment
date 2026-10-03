import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MagneticLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };
  return <a ref={ref} href={href} onPointerMove={move} onPointerLeave={reset} className={cn("magnetic-link", className)}>{children}</a>;
}
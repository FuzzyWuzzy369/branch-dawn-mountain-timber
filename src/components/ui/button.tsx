import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,opacity] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:opacity-90",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent hover:bg-accent/90",
        secondary: "border border-line bg-surface text-ink hover:bg-chip",
        ghost: "text-ink hover:bg-chip",
      },
      size: {
        md: "h-11 px-4",
        lg: "h-12 px-5 text-base",
        sm: "h-11 px-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

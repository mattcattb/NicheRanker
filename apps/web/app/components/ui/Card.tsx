import * as React from "react";
import {tv, type VariantProps} from "tailwind-variants";
import {cn} from "@/lib/utils/styling";

export const cardVariants = tv({
  base: "rounded-md border border-border overflow-hidden",
  variants: {
    variant: {
      default: "bg-card",
      elevated: "bg-card shadow-md",
      flat: "bg-background",
      highlight: "bg-primary/5 border-primary/20",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      default: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariantProps {
  className?: string;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

export function Card({className, variant, padding, ...restProps}: CardProps) {
  const classes = cardVariants({
    variant,
    padding,
  });

  return <div {...restProps} className={cn(classes, className)} />;
}

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/styling";
import { containerVariants } from "@/styles/layout";

type ContainerVariantProps = VariantProps<typeof containerVariants>;

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariantProps {
  className?: string;
}

export function Container({
  className,
  layout,
  padding,
  gap,
  margin,
  width,
  border,
  ...restProps
}: ContainerProps) {
  const classes = containerVariants({
    layout,
    padding,
    gap,
    margin,
    width,
    border,
  });

  return <div {...restProps} className={cn(classes, className)} />;
}

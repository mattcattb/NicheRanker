// src/components/ui/Label.tsx
import * as RAC from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/styling";
import { label } from "@/styles/field";

export type LabelVariantProps = VariantProps<typeof label>;

export interface LabelProps
  extends Omit<RAC.LabelProps, "className">,
    LabelVariantProps {
  className?: string;
}

export function Label({ className, variant, size, ...restProps }: LabelProps) {
  const classes = label({ variant, size });

  return <RAC.Label {...restProps} className={cn(classes, className)} />;
}

Label.displayName = "Label";

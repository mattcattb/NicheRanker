import * as RAC from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/styling";
import { input as inputVariant } from "@/styles/field";

export type InputVariantProps = VariantProps<typeof inputVariant>;

export interface InputProps
  extends Omit<RAC.InputProps, "className" | "size">,
    InputVariantProps {
  className?: string;
}

export function Input({ className, variant, size, ...restProps }: InputProps) {
  const classes = inputVariant({ variant, size });

  return <RAC.Input {...restProps} className={cn(classes, className)} />;
}

Input.displayName = "Input";

// src/components/ui/TextField.tsx
import * as RAC from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/styling";
import { wrapper } from "@/styles/field";

export type TextFieldVariantProps = VariantProps<typeof wrapper>;

export interface TextFieldProps
  extends Omit<RAC.TextFieldProps, "className">,
    TextFieldVariantProps {
  className?: string;
}

export function TextField({
  className,
  spacing,
  ...restProps
}: TextFieldProps) {
  const classes = wrapper({ spacing });

  return (
    <RAC.TextField
      {...restProps}
      className={cn(classes, "text-[16px]", className)}
    />
  );
}

TextField.displayName = "TextField";

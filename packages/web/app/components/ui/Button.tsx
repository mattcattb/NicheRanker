import * as RAC from "react-aria-components";
import {type VariantProps} from "tailwind-variants";
import {cn} from "@/lib/utils/styling";
import {buttonVariants} from "@/styles/button";

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<RAC.ButtonProps, "className">,
    ButtonVariantProps {
  className?: string;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  buttonState,
  size,
  fullWidth,
  isLoading,
  ...restProps
}: ButtonProps) {
  const classes = buttonVariants({
    variant,
    buttonState,
    size,
    fullWidth,
    isLoading,
  });

  return (
    <RAC.Button
      {...restProps}
      excludeFromTabOrder={true}
      className={cn(classes, className)}
    />
  );
}

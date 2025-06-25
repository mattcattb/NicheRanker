import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: "flex flex-col w-full",
  variants: {
    spacing: {
      default: "gap-2",
      tight: "gap-1",
      loose: "gap-3",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

export const label = tv({
  base: "text-sm font-medium",
  variants: {
    variant: {
      default: "text-muted-foreground",
      required:
        "text-muted-foreground after:content-['*'] after:ml-0.5 after:text-destructive",
      heading: "text-foreground font-semibold",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      md: "text-md",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const inputWrapper = tv({
  base: "flex relative w-full",
  variants: {
    layout: {
      default: "items-center",
      start: "items-start",
      end: "items-end",
    },
    spacing: {
      default: "gap-2",
      tight: "gap-1",
      none: "gap-0",
    },
  },
  defaultVariants: {
    layout: "default",
    spacing: "default",
  },
});

export const input = tv({
  base: [
    "w-full rounded-md border border-border bg-input text-foreground",
    "focus:outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "placeholder:text-muted-foreground",
    "transition-colors",
  ],
  variants: {
    variant: {
      default: "border-border",
      primary: "border-primary",
      error: "border-destructive",
    },
    size: {
      default: "h-10 px-3 py-2 text-[16px]",
      sm: "h-8 px-2 py-1 text-xs",
      lg: "h-12 px-4 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const descriptor = tv({
  base: "text-xs text-muted-foreground",
});

export const error = tv({
  base: "text-xs text-destructive mt-1",
});

export const helper = tv({
  base: "text-xs text-muted-foreground mt-1",
});

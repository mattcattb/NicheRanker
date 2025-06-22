import { tv } from "tailwind-variants";

export const containerVariants = tv({
  base: "w-full flex flex-col",
  variants: {
    layout: {
      default: "space-y-6 mx-1",
      compact: "space-y-4",
      tight: "space-y-2",
      none: "",
      wide: "space-y-12",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      default: "p-4",
      lg: "p-6",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
    margin: {
      none: "m-0",
      sm: "mb-2",
      default: "mb-6",
      lg: "mb-8",
    },
    width: {
      auto: "w-auto",
      full: "w-full",
      screen: "w-screen",
      sm: "max-w-sm mx-auto",
      md: "max-w-md mx-auto",
      lg: "max-w-lg mx-auto",
      xl: "max-w-xl mx-auto",
    },
    border: {
      none: "border-0",
      default: "border border-border rounded-md",
      card: "border border-border rounded-md bg-card shadow-sm",
    },
  },
  defaultVariants: {
    layout: "default",
    padding: "none",
    margin: "none",
    width: "full",
    border: "none",
    gap: "none",
  },
});

export const content = tv({
  base: "w-full",
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      default: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    align: "left",
    padding: "none",
  },
});

export const form = tv({
  base: "w-full",
  variants: {
    spacing: {
      default: "space-y-6",
      compact: "space-y-4",
      tight: "space-y-2",
    },
    align: {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    },
  },
  defaultVariants: {
    spacing: "default",
    align: "left",
  },
});

export const label = tv({
  base: "block text-sm",
  variants: {
    variant: {
      default: "text-muted-foreground font-medium",
      required:
        "text-muted-foreground font-medium after:content-['*'] after:ml-0.5 after:text-destructive",
      heading: "text-foreground font-semibold",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
    margin: {
      none: "mb-0",
      sm: "mb-1",
      default: "mb-2",
      lg: "mb-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    margin: "default",
  },
});

export const value = tv({
  base: "font-medium",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-base",
      default: "text-lg",
      lg: "text-xl",
      xl: "text-4xl",
      xxl: "text-7xl",
    },
    weight: {
      normal: "font-medium",
      bold: "font-bold",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      success: "text-win",
      error: "text-destructive",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "normal",
    variant: "default",
  },
});

export const status = tv({
  base: "rounded-md px-2 py-1 text-xs font-medium",
  variants: {
    variant: {
      info: "bg-primary/20 text-primary",
      success: "bg-win/20 text-win",
      warning: "bg-cashout/20 text-cashout",
      error: "bg-destructive/20 text-destructive",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const overlay = tv({
  base: [
    "fixed inset-0 z-50 bg-black/70 p-4",
    "flex justify-center",
    "overflow-y-auto",
    //"data-entering:opacity-0 opacity-100 transition-all",
  ],
});
export const modal = tv({
  base: [
    "relative w-full my-auto",
    "max-h-fit",
    "rounded-md bg-card shadow-lg overflow-hidden",
    "border border-border text-card-foreground",
    "data-entering:opacity-0 data-entering:scale-95 scale-100 opacity-100 data-exiting:opacity-0 transition-all",
  ],
  variants: {
    size: {
      default: "max-w-md",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      xxl: "max-w-3xl",
      "3xl": "max-w-4xl",
      full: "max-w-full mx-4",
      auth: "max-w-md",
    },
    position: {
      center: "",
      top: "mt-14",
    },
  },
  defaultVariants: {
    size: "default",
    position: "center",
  },
});

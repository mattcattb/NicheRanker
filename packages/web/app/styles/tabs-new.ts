import { tv } from "tailwind-variants";

export const tabsVariants = tv({
  base: "flex flex-col",
  variants: {
    orientation: {
      horizontal: "flex-col gap-4",
      vertical: "flex-row gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const tabListVariants = tv({
  base: "flex",
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground rounded-md p-1",
      outline: "bg-transparent border border-border rounded-md",
      pill: "bg-muted rounded-full p-1",
      underline: "border-b border-border",
      clean: "bg-transparent gap-1",
    },
    fullWidth: {
      true: "w-full",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col h-auto",
    },
  },
  defaultVariants: {
    variant: "default",
    fullWidth: false,
    orientation: "horizontal",
  },
});

export const tabVariants = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:opacity-50 disabled:pointer-events-none cursor-default",
    "data-[selected]:shadow-sm data-[selected]:text-foreground",
  ],
  variants: {
    variant: {
      default:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[selected]:bg-background",
      outline:
        "border border-transparent text-muted-foreground hover:text-foreground data-[selected]:bg-background data-[selected]:border-border",
      pill: "rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[selected]:bg-background",
      underline:
        "rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[selected]:border-b-primary",
      bitcoin:
        "rounded-md border border-border bg-secondary text-muted-foreground hover:border-primary active:bg-secondary/80 data-[selected]:border-primary data-[selected]:text-foreground",
      clean:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[selected]:bg-muted",
    },
    size: {
      default: "h-9 px-3 py-1.5",
      sm: "h-8 px-2 py-1 text-xs",
      lg: "h-10 px-4 py-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const tabPanelVariants = tv({
  base: "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  variants: {
    padding: {
      sm: "p-2",
      default: "p-0",
      lg: "p-6",
    },
    fixedHeight: {
      true: "min-h-[300px]",
      false: "",
    },
    spacing: {
      none: "",
      compact: "space-y-2",
      default: "space-y-4",
      large: "space-y-6",
    },
  },
  defaultVariants: {
    padding: "default",
    fixedHeight: false,
    spacing: "none",
  },
});

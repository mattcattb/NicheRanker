import { tv } from "tailwind-variants"

export const tabs = tv({
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
})

export const tabList = tv({
  base: "flex",
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground rounded-md p-1",
      outline: "bg-transparent border border-border rounded-md",
      pill: "bg-muted rounded-full p-1",
      underline: "border-b border-border",
      clean: "bg-transparent",
      buttons: "bg-transparent p-0 overflow-hidden rounded-lg",
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
})

export const tab = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:opacity-50 disabled:pointer-events-none cursor-default",
    "aria-current-page:text-foreground cursor-pointer",
    "data-[selected]:shadow-sm data-[selected]:text-foreground",
  ],
  variants: {
    variant: {
      default: [
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "aria-current-page:bg-background data-[selected]:bg-background",
      ],
      outline: [
        "border border-transparent text-muted-foreground hover:text-foreground",
        "aria-current-page:border-border aria-current-page:bg-background",
        "data-[selected]:bg-background data-[selected]:border-border",
      ],
      pill: [
        "rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "aria-current-page:bg-background data-[selected]:bg-background",
      ],
      underline: [
        "rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground",
        "aria-current-page:border-b-primary data-[selected]:border-b-primary",
      ],
      bitcoin: [
        "rounded-md border border-border bg-secondary text-muted-foreground",
        "hover:border-primary active:bg-secondary/80",
        "aria-current-page:border-primary aria-current-page:text-foreground",
        "data-[selected]:border-primary data-[selected]:text-foreground",
      ],
      buttons: [
        "rounded-none bg-muted text-muted-foreground hover:text-foreground",
        "aria-current-page:bg-background data-[selected]:bg-muted-foreground/25",
      ],
    },
    size: {
      default: "h-9 px-3 py-1.5",
      sm: "h-8 px-2 py-1 text-xs",
      lg: "h-12 px-4 py-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export const tabPanel = tv({
  base: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  variants: {
    padding: {
      sm: "p-2",
      default: "p-0",
      lg: "p-6",
    },
    fixedHeight: {
      true: "min-h-[376px]",
      false: "h-fit",
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
  },
})

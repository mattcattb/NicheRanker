import {tv} from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "cursor-pointer",
    "transition-all duration-200 ease-in-out",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      primary: "bg-primary text-black hover:bg-primary/80",
      destructive: "bg-destructive text-black hover:bg-destructive/75",
      ghost: "bg-transparent hover:bg-muted hover:text-foreground",
      outline:
        "border border-border bg-transparent hover:bg-border hover:text-foreground",
      link: "bg-transparent text-primary underline-offset-4 hover:underline",
      bet: "bg-bet text-primary-foreground hover:bg-bet/90",
      win: "bg-win text-primary-foreground hover:bg-win/90",
      cashout: "bg-cashout text-background hover:bg-cashout/90",
    },
    buttonState: {
      default: "active:opacity-80",
      autoRolling: "ring-2 ring-primary/50",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      default: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-base",
      xl: "h-16 px-8 text-base",
      icon: "h-10 w-10 p-0",
      "icon-sm": "h-8 w-8 p-0",
    },
    fullWidth: {
      true: "w-full",
    },
    isLoading: {
      true: "relative opacity-50 cursor-wait",
    },
  },

  compoundVariants: [
    {
      isLoading: true,
      variant: ["default", "primary", "destructive"],
      className: "cursor-wait",
    },
  ],

  defaultVariants: {
    variant: "default",
    size: "default",
    buttonState: "default",
  },
});

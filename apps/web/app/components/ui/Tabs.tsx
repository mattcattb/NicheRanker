// components/ui/Tabs.tsx

import {
  tabPanelVariants,
  tabVariants,
  tabsVariants,
  tabListVariants,
} from "@/styles/tabs-new";
import * as RAC from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants"; // Assuming tv is available
import { cn } from "@/lib/utils/styling"; // Adjust path as needed

type TabsVariantProps = VariantProps<typeof tabsVariants>;
type TabListVariantProps = VariantProps<typeof tabListVariants>;
type TabVariantProps = VariantProps<typeof tabVariants>;
type TabPanelVariantProps = VariantProps<typeof tabPanelVariants>;

export interface TabsProps
  extends Omit<RAC.TabsProps, "className">,
    TabsVariantProps {
  className?: string;
}

export function Tabs({ className, orientation, ...restProps }: TabsProps) {
  const classes = tabsVariants({ orientation });
  return <RAC.Tabs {...restProps} className={cn(classes, className)} />;
}

export interface TabListProps
  extends Omit<RAC.TabListProps<object>, "className">,
    TabListVariantProps {
  className?: string;
}

export function TabList({
  className,
  variant,
  fullWidth,
  orientation,
  ...restProps
}: TabListProps) {
  const classes = tabListVariants({ variant, fullWidth, orientation });
  return (
    <RAC.TabList<object> {...restProps} className={cn(classes, className)} />
  );
}

export interface TabProps
  extends Omit<RAC.TabProps, "className">,
    TabVariantProps {
  className?: string;
}

export function Tab({
  className,
  variant,
  size,
  fullWidth,
  ...restProps
}: TabProps) {
  const classes = tabVariants({ variant, size, fullWidth });
  return <RAC.Tab {...restProps} className={cn(classes, className)} />;
}

// --- TabPanel Wrapper ---
export interface TabPanelProps
  extends Omit<RAC.TabPanelProps, "className">,
    TabPanelVariantProps {
  className?: string;
}

export function TabPanel({
  className,
  padding,
  fixedHeight,
  spacing,
  ...restProps
}: TabPanelProps) {
  const classes = tabPanelVariants({ padding, fixedHeight, spacing });
  return <RAC.TabPanel {...restProps} className={cn(classes, className)} />;
}

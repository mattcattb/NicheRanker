import { cn } from "@/lib/utils/styling";
import {
  Popover as RACPopover,
  type PopoverProps,
} from "react-aria-components";

export default function Popover(props: PopoverProps) {
  return (
    <RACPopover
      {...props}
      className={({ isEntering, isExiting }) =>
        cn(
          `
        placement-bottom:mt-1 placement-top:mb-2 group rounded-lg drop-shadow-lg
        ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
            : ""
        }
        ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
            : ""
        }
      `,
          props.className,
        )
      }
    />
  );
}

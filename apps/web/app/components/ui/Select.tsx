import Popover from "@/components/ui/Popover";
import {cn} from "@/lib/utils/styling";
import {ChevronDown} from "lucide-react";
import type {
  ListBoxItemProps,
  SelectProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError,
  Text,
  Button,
  Label,
  Select as RACSelect,
  SelectValue,
  ListBox,
  ListBoxItem,
} from "react-aria-components";

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  icon?: string;
  onChange?: (value: T) => void;
}

export function Select<T extends object>({
  label,
  icon,
  description,
  errorMessage,
  children,
  items,
  className,
  onChange,
  ...props
}: MySelectProps<T>) {
  return (
    <RACSelect {...props}>
      <Label>{label}</Label>
      <Button
        className={cn(
          "w-full bg-muted px-3 py-2 text-start text-sm gap-1 flex justify-between items-center rounded-md cursor-pointer",
          className
        )}>
        <div className="flex items-center gap-2">
          <SelectValue />
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-all" />
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className={"bg-muted p-1 shadow-lg text-sm"}>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({isFocused, isSelected}) =>
        `p-1.5 cursor-pointer hover:bg-muted-foreground/15 rounded-md ${
          isFocused ? "focused" : ""
        } ${isSelected ? "selected" : ""}`
      }
    />
  );
}

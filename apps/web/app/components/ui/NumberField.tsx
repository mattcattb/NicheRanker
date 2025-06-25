import type { NumberFieldProps, ValidationResult } from "react-aria-components";
import { FieldError, Text } from "react-aria-components";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField as RACNumberField,
} from "react-aria-components";

interface MyNumberFieldProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function NumberField({
  label,
  description,
  errorMessage,
  ...props
}: MyNumberFieldProps) {
  return (
    <RACNumberField {...props}>
      {label && <Label>{label}</Label>}
      <Input />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}

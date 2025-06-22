import {
  Button,
  Disclosure as RACDisclosure,
  DisclosurePanel,
  Heading,
  type DisclosureProps,
} from "react-aria-components";

interface MyDisclosureProps extends Omit<DisclosureProps, "children"> {
  title?: string;
  children?: React.ReactNode;
}

export function Disclosure({ title, children, ...props }: MyDisclosureProps) {
  return (
    <RACDisclosure {...props}>
      <Heading>
        <Button slot="trigger">
          <svg viewBox="0 0 24 24">
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          {title}
        </Button>
      </Heading>
      <DisclosurePanel>
        <p>{children}</p>
      </DisclosurePanel>
    </RACDisclosure>
  );
}

import {Container} from "@/components/ui/Container";
import {Input} from "@/components/ui/field/Input";
import {Form, Outlet} from "react-router";

export default function LayoutPage() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

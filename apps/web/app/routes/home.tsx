import {Container} from "@/components/ui/Container";
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "New React Router App"},
    {name: "description", content: "Welcome to React Router!"},
  ];
}

export default function Home() {
  return (
    <Container>
      <h1>Hello!</h1>
    </Container>
  );
}

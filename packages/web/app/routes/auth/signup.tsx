import {Button} from "@/components/ui/Button";
import {Container} from "@/components/ui/Container";
import {Input} from "@/components/ui/field/Input";
import {Form, redirect} from "react-router";
import type {Route} from "./+types/signup";
import {
  apiRPCOptionalToken,
  setSessionFromContext,
} from "@/.server/session.utils";
import {tryRpcExpectingData} from "@/.server/api-rpc";
import {flashErrorToast} from "@/.server/toast.utils";
import {RPCBadRequestError} from "@/lib/errors";

export async function action({context, request}: Route.ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  if (!username || !password) {
    flashErrorToast(context, {message: "Please enter password and username"});
    return;
  }

  const client = apiRPCOptionalToken(context);
  const [error, json] = await tryRpcExpectingData(
    client.api.auth["sign-up"].$post({
      json: {
        password,
        username,
      },
    })
  );

  if (error) {
    if (error instanceof RPCBadRequestError) {
      flashErrorToast(context, error);
      return;
    }

    throw error;
  }

  const {token, user} = json;

  setSessionFromContext(context, {
    token,
    userId: user.id,
  });

  return redirect("/");
}

export default function SignupPage({}: Route.ComponentProps) {
  return (
    <Container>
      <Form>
        <Input type="text" name="username" placeholder="username" required />
        <Input type="text" name="password" placeholder="password" required />
        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  );
}

import {flashErrorToast} from "@/.server/toast.utils";
import type {Route} from "./+types/signin";
import {
  apiRPCOptionalToken,
  setSessionFromContext,
} from "@/.server/session.utils";
import {tryRpcExpectingData} from "@/.server/api-rpc";
import {RPCBadRequestError} from "@/lib/errors";
import {redirect} from "react-router";

export async function action({context, request}: Route.ActionArgs) {
  const formData = await request.formData();

  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  if (!username || !password) {
    flashErrorToast(context, {message: "Please enter a password and username"});
    return;
  }

  const client = apiRPCOptionalToken(context);
  const [error, json] = await tryRpcExpectingData(
    client.api.auth["sign-in"].$post({
      json: {
        password,
        username,
      },
    })
  );

  if (error) {
    if (error instanceof RPCBadRequestError) {
      flashErrorToast(context, {
        message: "Invalid credentials. Please try again.",
      });
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

export default function SigninPage({}: Route.ComponentProps) {}

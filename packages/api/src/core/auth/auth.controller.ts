import {createRouter} from "@/common/create-app";
import * as AuthMiddleware from "./auth.middleware";
import * as AuthService from "./auth.service";
import {zValidator} from "@hono/zod-validator";
export const authController = createRouter()
  .post("/sign-in", zValidator("json", AuthService.signInSchema), async (c) => {
    const json = c.req.valid("json");
    const headerData = c.get("headerData");
    const response = await AuthService.signIn(json, headerData);
    return c.json(response, 200);
  })
  .post("/sign-up", zValidator("json", AuthService.signUpSchema), async (c) => {
    const json = c.req.valid("json");
    const headerData = c.get("headerData");
    const response = await AuthService.signUp(json, headerData);
    return c.json(response, 200);
  })
  .use(AuthMiddleware.sessionMiddleware)
  .delete("/sign-out", async (c) => {
    const userId = c.get("userId");
    const session = c.get("session");
    const result = await AuthService.signOut(userId, session.id);

    return c.json(result, 200);
  });

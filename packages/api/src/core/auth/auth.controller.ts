import {createRouter} from "@/common/create-app";
import * as AuthMiddleware from "./auth.middleware";
import * as AuthService from "./auth.service";
export const authController = createRouter()
  .post("/sign-in", async (c) => {
    return c.json({message: "scuccess!"}, 200);
  })
  .post("/sign-up", async (c) => {})
  .use(AuthMiddleware.sessionMiddleware)
  .delete("/sign-out", async (c) => {
    const userId = c.get("userId");
    const session = c.get("session");
    const result = await AuthService.signOut();

    return c.json(result, 200);
  });

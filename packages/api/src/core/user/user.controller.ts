import {createRouter} from "@/common/create-app";
import * as AuthMiddleware from "@/core/auth/auth.middleware";
import * as UserService from "./user.service";
import {NotFoundException} from "@/common/exceptions";

export const usersController = createRouter()
  .use(AuthMiddleware.sessionMiddleware)
  .get("/", async (c) => {
    const userId = c.get("userId");
    const response = await UserService.getUser(userId);

    if (!response) {
      throw new NotFoundException(`User ${userId} not found!`);
    }

    return c.json(response, 200);
  });

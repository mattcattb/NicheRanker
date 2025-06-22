import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/auth/layout.tsx", [
    route("/sign-in", "routes/auth/signin.tsx"),
    route("/signup", "routes/auth/signup.tsx"),
  ]),
] satisfies RouteConfig;

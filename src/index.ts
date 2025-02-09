import { Elysia } from "elysia";
import { apiRoutes } from "./routes";

const app = new Elysia()
  .use(apiRoutes)
  .get("/", () => "Hello Elysia")
  .get("/signature", () => "🦊 Sigma core v.0.0.1")
  .listen(3000);

console.log(
  `🦊 Sigma-core is running at ${app.server?.hostname}:${app.server?.port}`
);

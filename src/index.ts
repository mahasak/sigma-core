import { html } from '@elysiajs/html';
import { jwt } from '@elysiajs/jwt'
import { staticPlugin } from '@elysiajs/static';
import { Context, Elysia } from 'elysia';
import { serverTiming } from '@elysiajs/server-timing'
import { apiRoutes, pageRoutes } from "./routes";

import { Protected, NotLogged, Logged, Login } from "./views/test";
// import { logger } from "@bogeychan/elysia-logger";
import { randomUUID } from "node:crypto";
import {
  logger,
  serializers,
  serializeRequest,
  type InferContext,
} from "@bogeychan/elysia-logger";

const mySerializers = {
  ...serializers,
  request: (request: Request) => {
    const url = new URL(request.url);

    return {
      ...serializeRequest(request),
      // https://http.dev/x-request-id
      id: request.headers.get("X-Request-ID") ?? randomUUID(),
      path: url.pathname,
    };
  },
};

const app : Elysia = new Elysia()
  .use(
    jwt({
      name: "jwt",
      // This is a secret key, you should change it in production
      secret: "your secret",
    })
  )
  .use(html())
  .use(serverTiming())
  .use(logger())
  .trace(async ({ onHandle }) => {
    onHandle(({ begin, onStop }) => {
      onStop(({ end }) => {
        console.log('handle took', end - begin, 'ms')
      })
    })
  })
  .get('/', async (ctx: Context) => {
    (ctx as any).log.error(ctx, "Context");
    ctx.log?.info(ctx.request, "Request"); // noop
    ctx.set.headers["content-type"] = 'text/html; charset=utf8'
    return "test";
  })
  .use(pageRoutes)
  .listen(3000);

console.log(
  `🦊 Sigma-core is running at ${app.server?.hostname}:${app.server?.port}`
);

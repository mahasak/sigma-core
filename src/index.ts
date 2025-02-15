import { Elysia } from "elysia";
import { apiRoutes } from "./routes";
import { serverTiming } from '@elysiajs/server-timing'
import { html } from '@elysiajs/html'

import { logger } from "@bogeychan/elysia-logger";


import main from './views/main'
const app = new Elysia()
  .trace(async ({ onHandle }) => {
    onHandle(({ begin, onStop }) => {
      onStop(({ end }) => {
        console.log('handle took', end - begin, 'ms')
      })
    })
  })
  .use(serverTiming())
  .use(html())
  .use(logger())
  // .use(ElysiaLogging())


  .get("/", (ctx) => "🦊 Sigma core v.0.0.1", {
    afterResponse() {
      console.log('After response')
    }
  })

  .get('/html', (ctx) => {
    ctx.log.error(ctx, "Context");
    ctx.log.info(ctx.request, "Request"); // noop
    ctx.set.headers["content-type"] = 'text/html; charset=utf8'
    return main
  })
  .use(apiRoutes)
  .listen(3000);

console.log(
  `🦊 Sigma-core is running at ${app.server?.hostname}:${app.server?.port}`
);

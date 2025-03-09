import { html } from '@elysiajs/html';
import { jwt } from '@elysiajs/jwt'
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { serverTiming } from '@elysiajs/server-timing'
import { apiRoutes, pageRoutes } from "./routes";

import { Protected, NotLogged, Logged, Login } from "./views/test";
import { logger } from "@bogeychan/elysia-logger";


const app = new Elysia()
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
  // .use(apiRoutes)
  // @ts-ignore  
  .use(pageRoutes)
  .listen(3000);

console.log(
  `🦊 Sigma-core is running at ${app.server?.hostname}:${app.server?.port}`
);

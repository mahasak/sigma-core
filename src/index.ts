import { Elysia } from "elysia";
import { apiRoutes } from "./routes";
import { html, Html } from '@elysiajs/html'
import * as elements from "typed-html"

import main from './views/main'
const app = new Elysia()
  .use(html())
  
  .get("/", () => "🦊 Sigma core v.0.0.1",  {
		afterResponse() {
			console.log('After response')
		}
	})
  .get('/html', ({ set, error }) => {
    set.headers["content-type"] = 'text/html; charset=utf8'
    return main
  }
  , {
		afterResponse() {
			console.log('After response')
		}
	})
  .use(apiRoutes)
  .listen(3000);

console.log(
  `🦊 Sigma-core is running at ${app.server?.hostname}:${app.server?.port}`
);

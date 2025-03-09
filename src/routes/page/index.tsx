import { Html } from '@elysiajs/html';
import { Elysia, InternalServerError, redirect, t } from 'elysia';

import MainLayout from '../../views/layouts/main';
import { Logged, Login, NotLogged, Protected } from '../../views/test';
const users = [
  {
    username: "admin",
    password: await Bun.password.hash("admin"),
  },
  {
    username: "user",
    password: await Bun.password.hash("user"),
  },
];

export const pageRoutes = new Elysia()
 .get('/', async () => {
    // ctx.log.error(ctx, "Context");
    // ctx.log.info(ctx.request, "Request"); // noop
    // ctx.set.headers["content-type"] = 'text/html; charset=utf8'
    return (<MainLayout><div>test</div></MainLayout>)
  })
  // @ts-ignore
  .get("/home", async ({ jwt, cookie: { auth } }) => {
    const authCookie = await jwt.verify(auth?.value);
    console.log(authCookie)
    return authCookie ? (<Logged></Logged>) : <Login></Login>
  })
  // @ts-ignore
  .get("/protected", async ({ jwt, cookie: { auth } }) => {
    const authCookie = await jwt.verify(auth?.value);
    return authCookie ? (
      <Protected username={authCookie.username} />
    ) : (
      <NotLogged />
    );
  })
  .post(
    "/login",
    // @ts-ignore
    async ({ jwt, body, set, cookie: { auth } }) => {
      const { password, username } = body;
      console.log(body);
      // @ts-ignore 
      const user = users.find((user) => user.username === username);

      if (user && (await Bun.password.verify(password, user.password))) {
        const token = await jwt.sign({ username });

        auth?.set({
          value: token,
          httpOnly: true,
        });

        set.headers = {
          "Hx-redirect": "/protected",
        };
        return "Login successful!";
      }
      return "Invalid credentials";
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/logout", async ({ set, cookie: { auth },redirect }) => {
   auth?.remove();
    // set.redirect = "/home";
    
    // set.headers = {
    //   "Hx-redirect": "/home",
    // };
    // return "Logged out"
    return redirect('/home')
    // redirect('/home')
  })
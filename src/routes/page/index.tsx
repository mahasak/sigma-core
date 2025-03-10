import { Html } from '@elysiajs/html';
import { Elysia, InternalServerError, redirect, t } from 'elysia';
import { jwt } from '@elysiajs/jwt'
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
.use(
  jwt({
      name: "jwt",
      // This is a secret key, you should change it in production
      secret: "your secret",
    })
  )
  .get("/home", async ( { jwt, cookie: { auth } }: any) => {
    const authCookie = await jwt.verify(auth?.value);
    console.log(authCookie)
    //  ctx.log.error(ctx, "Context");
    // ctx.log.info(ctx.request, "Request"); // noop
    // ctx.set.headers["content-type"] = 'text/html; charset=utf8'
    return authCookie ? (<Logged></Logged>) : <Login></Login>
  })
  .get("/protected", async ({ jwt, cookie: { auth } }) => {
    const authCookie = await jwt.verify(auth?.value);
    return authCookie && authCookie.username ? (
      <Protected username={authCookie.username.toString()} />
    ) : (
      <NotLogged />
    );
  })
  .post(
    "/login",
    async ({ jwt, body, set, cookie: { auth } }) => {
      const { password, username } = body;
      console.log(body);
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
  .get("/logout", async ({ set, cookie: { auth }, redirect }) => {
    auth?.remove();
    return redirect('/home')
  })
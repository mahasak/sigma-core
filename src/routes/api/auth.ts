import { Elysia } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-in",
    async (c) => {
      return {
        message: "Sig-in successfully",
      };
    },

  )
  .post(
    "/sign-up",
    async (c) => {
      return {
        message: "Account created successfully",
      };
    },
  )
  .post(
    "/refresh",
    async (c) => {
      return {
        message: "Access token generated successfully",
      };
    }
  )
  .post("/logout", async (c) => {
    return {
      message: "Logout successfully",
    };
  })
  .get("/me", (c) => {
    return {
      message: "Fetch current user",
    };
  });

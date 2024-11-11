import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://article-writer-jade.vercel.app";

export const authClient = createAuthClient({
  baseURL,
});

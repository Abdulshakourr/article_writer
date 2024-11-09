import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://article-writer-jade.vercel.app", // the base url of your auth server
});

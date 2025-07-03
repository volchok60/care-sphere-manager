
import { createCookieSessionStorage } from "react-router";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"], // In production, use a proper secret
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

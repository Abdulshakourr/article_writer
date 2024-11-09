"use server";

import { db } from "@/lib/db";

export async function test(formData: any) {
  const name = formData.get("name");
  const email = formData.get("email");
  console.log("test", name, email);

  if (!name || !email) {
    return { data: "error" };
  }

  const data = await db.user.create({
    data: {
      name,
      email,
    },
  });

  return { message: data };
}

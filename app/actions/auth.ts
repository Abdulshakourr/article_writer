"use server";

import { authClient } from "@/lib/auth-client";
import { signupFormSchema, FormState } from "@/lib/definitions";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = signupFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validatedFields.data;

    const { data,error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    console.log("data", data)
    console.log("error", error)

    if (error) {
      return {
        errors: error.message,
      };
    }

    return { message: "success" };
  } catch (error) {
    console.log("error", error);
    return { 
      errors: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
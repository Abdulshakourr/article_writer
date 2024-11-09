"use server";

import { authClient } from "@/lib/auth-client";
import {
  signupFormSchema,
  FormState,
  signinFormSchema,
} from "@/lib/definitions";

export async function signup(state: FormState, formData: FormData) {
  // Validate the form data
  //
  try {
    const validatedFields = signupFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validatedFields.data;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      return {
        errors: error.message,
      }
    }

    return { message: "success"};
  } catch (error) {
    console.log("error", error);
    return { errors: error };
  }
}

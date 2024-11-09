"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinFormSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (Values: z.infer<typeof signinFormSchema>) => {
    console.log("Values", Values);
    const { email, password } = Values;
    const data = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          //show loading
          setLoading(true);
        },
        onSuccess: () => {
          //redirect to dashboard
          form.reset();
          setLoading(false);
          console.log("what is goin on");
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            title: ctx.error.message,
          });
          setLoading(false);
        },
      },
    );

    console.log("data", data);
  };

  return (
    <div className="w-full max-w-md  px-4 py-6 shadow-md rounded-lg bg-white">
      <h1 className="text-xl font-semibold text-center mb-2">Sign In</h1>
      <p className="text-center text-sm font-medium text-gray-400 mb-4">
        Welcome back! Please sign in to continue.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-400 font-semibold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="pt-2  font-semibold text-gray-400">
                  Password
                </FormLabel>
                <FormControl className="my-2">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-4 w-full font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign in"}
          </Button>
          <p className="text-sm mt-4 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-up" className="text-black hover:underline">
              Sign up{" "}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
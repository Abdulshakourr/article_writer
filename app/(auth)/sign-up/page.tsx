"use client";

import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";



type FormState = {
  errors?:string
  message?: string;
} | undefined;

export default function SignupForm() {
  const [state, action] = useFormState<FormState, FormData>(
    signup,
    undefined
  );
  const router = useRouter()
  if (state?.errors) {
    console.log("Error", state?.errors);
    toast({
      variant: "destructive",
      title: state?.errors,
    });
  }

  if(state?.message === "success"){
    router.push("/sign-in")
  }


  console.log("state", state);
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign Up
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="w-full"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500 font-medium">
                {state.errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="w-full"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500 font-medium">
                {state.errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="w-full"
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
            />
            {state?.errors?.password && (
              <p className="text-sm text-red-500 font-medium">
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}

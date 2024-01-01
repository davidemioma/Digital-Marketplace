"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  authCredentialSchema,
  authCredentialValidator,
} from "@/lib/validators/auth";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authCredentialSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: authCredentialValidator) => {};

  return (
    <div className="relative container flex flex-col items-center justify-center pt-32 lg:px-0">
      <div className="w-full sm:w-[350px] mx-auto flex flex-col justify-center">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />

          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-up"
          >
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <form>
          <div className="grid gap-2">
            <div className="grid gap-2 py-2">
              <Label htmlFor="email">Email</Label>

              <Input
                className={cn(errors.email && "focus-visible:ring-red-500")}
                placeholder="you@example.com"
                {...register("email")}
              />

              {errors?.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            <div className="grid gap-2 py-2">
              <Label htmlFor="password">Password</Label>

              <Input
                className={cn(errors.password && "focus-visible:ring-red-500")}
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>

            <Button type="submit">Sign In</Button>
          </div>
        </form>

        <div></div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/_trpcClient";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  authCredentialSchema,
  authCredentialValidator,
} from "@/lib/validators/auth";

export default function SignIn() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const isSeller = searchParams.get("as") === "seller";

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

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
    onSuccess: () => {
      toast.success("Signed in successfully");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);

        return;
      }

      if (isSeller) {
        router.push("/sell");

        return;
      }

      router.push("/");
    },
  });

  const onSubmit = ({ email, password }: authCredentialValidator) => {
    signIn({ email, password });
  };

  return (
    <div className="relative container flex flex-col items-center justify-center pt-32 lg:px-0">
      <div className="w-full sm:w-[350px] mx-auto flex flex-col justify-center">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />

          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your {isSeller ? "seller" : ""} account
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

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  className={cn(
                    errors.password && "focus-visible:ring-red-500"
                  )}
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

              <Button type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {isSeller ? (
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={() => router.replace("/sign-in", undefined)}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={() => router.push("?as=seller")}
            >
              Continue as seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/_trpcClient";
import { redirect } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { Loader2, XCircle } from "lucide-react";

type Props = {
  token: string;
};

const VerifyEmail = ({ token }: Props) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 text-zinc-300 animate-spin " />

        <h3 className="text-xl font-semibold">Verifying...</h3>

        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />

        <h3 className="text-xl font-semibold">There was a problem</h3>

        <p className="text-sm text-muted-foreground">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data.success) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative h-60 w-60 mb-4 text-muted-foreground">
          <Image
            className="object-cover"
            src="/hippo-email-sent.png"
            fill
            alt="email sent"
          />
        </div>

        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>

        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email.
        </p>

        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  return redirect("/sign-in");
};

export default VerifyEmail;

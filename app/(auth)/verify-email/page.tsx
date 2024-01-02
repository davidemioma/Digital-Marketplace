import Image from "next/image";
import VerifyEmail from "@/components/VerifyEmail";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const toEmail = searchParams.to;

  const token = searchParams.token;

  return (
    <div className="relative container flex flex-col items-center justify-center pt-32 lg:px-0">
      <div className="w-full sm:w-[350px] mx-auto flex flex-col justify-center">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-1">
            <div className="relative h-60 w-60 mb-4 text-muted-foreground">
              <Image
                className="object-cover"
                src="/hippo-email-sent.png"
                fill
                alt="email_img"
              />
            </div>

            <h3 className="text-2xl font-semibold">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

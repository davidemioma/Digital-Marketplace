import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../../get-payload";
import { authCredentialSchema } from "../../lib/validators/auth";

export const authRouter = router({
  registerUser: publicProcedure
    .input(authCredentialSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      //Get payload CMS client
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      //Create new user
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      //Get payload CMS client
      const payload = await getPayloadClient();

      //Verify the user based on the token
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return { success: true };
    }),

  signIn: publicProcedure
    .input(authCredentialSchema)
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx;

      const { email, password } = input;

      //Get payload CMS client
      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});

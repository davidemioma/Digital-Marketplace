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

      return {};
    }),
});

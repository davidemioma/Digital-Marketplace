import { User } from "../../payload-types";
import { ExpressContext } from "../../server";
import { PayloadRequest } from "payload/types";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.context<ExpressContext>().create();

const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest;

  const { user } = req as { user: User | null };

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;

export const publicProcedure = t.procedure; //Means a public route, Anyone can call it even if a user is not authenticated.

export const privateProcedure = t.procedure.use(isAuth); //Means a private route, User have to be authenticated.

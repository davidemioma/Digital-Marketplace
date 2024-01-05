import { z } from "zod";
import { authRouter } from "./auth-router";
import { paymentRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../../get-payload";
import { QuerySchema } from "../../lib/validators/query";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QuerySchema,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;

      const { sort, limit, ...queryOpts } = query;

      //Get payload CMS client
      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      //Get the current page number
      const page = cursor || 1;

      //Fetch products that has been approved by admin
      const {
        docs: products,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        products,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;

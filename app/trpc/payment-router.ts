import { z } from "zod";
import type Stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { stripe } from "../../lib/stripe";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../../get-payload";

export const paymentRouter = router({
  createStripeSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      let { productIds } = input;

      if (productIds.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      //Get payload CMS client
      const payload = await getPayloadClient();

      //Get product using productIds
      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      //Get products with valid priceId to create order
      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

      //Create an order
      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      });

      //Create line_items
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      filteredProducts.forEach((product) => {
        line_items.push({
          price: product.priceId!,
          quantity: 1,
        });
      });

      line_items.push({
        price: "price_1OVGyzCIf2PDJKmNtsKGLPdz",
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });

      //Create stripe checkout session.
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          mode: "payment",
          payment_method_types: ["card", "paypal"],
          line_items,
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
        });

        return { url: stripeSession.url };
      } catch (err) {
        console.log(err);
        return { url: null };
      }
    }),
});

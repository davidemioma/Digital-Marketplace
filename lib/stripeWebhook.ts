import Stripe from "stripe";
import express from "express";
import { Resend } from "resend";
import { stripe } from "./stripe";
import { Product } from "../payload-types";
import { WebhookRequest } from "../server";
import { getPayloadClient } from "../get-payload";
import { ReceiptEmailHtml } from "../components/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;

  const body = webhookRequest.rawBody;

  const signature = req.headers["stripe-signature"] || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${
          error instanceof Error ? error.message : "Unknown Error"
        }`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;

  const orderId = session?.metadata?.orderId;

  if (!userId || !orderId) {
    return res.status(400).send(`Webhook Error: No user present in metadata`);
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: userId,
        },
      },
    });

    const [user] = users;

    if (!user) return res.status(404).json({ error: "No such user exists." });

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: orderId,
        },
      },
    });

    const [order] = orders;

    if (!order) return res.status(404).json({ error: "No such order exists." });

    //If userId and orderId is valid update payment status to true
    await payload.update({
      collection: "orders",
      where: {
        id: {
          equals: orderId,
        },
      },
      data: {
        _isPaid: true,
      },
    });

    //send Reciept
    try {
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [user.email],
        subject: "Thanks for your order! This is your receipt.",
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: orderId,
          products: order.products as Product[],
        }),
      });

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  return res.status(200).send();
};

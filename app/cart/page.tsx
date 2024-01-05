"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/use-cart";
import { trpc } from "@/lib/_trpcClient";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const fee = 1;

  const { items, removeItem } = useCart();

  const [isMounted, setIsMounted] = useState(false);

  const cartTotal = items.reduce(
    (total, { product: { price } }) => total + price,
    0
  );

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Something went wrong! please try again.");
        }
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white max-w-2xl lg:max-w-7xl mx-auto pb-24 pt-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl text-gray-900 font-bold tracking-tight">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 mt-12">
        <div
          className={cn(
            "lg:col-span-7",
            items.length === 0 &&
              "rounded-lg border-2 border-dashed border-zinc-200 p-12"
          )}
        >
          <h2 className="sr-only">Items in your shopping cart</h2>

          {items.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-1">
              <div
                className="relative h-40 w-40 mb-4 text-muted-foreground"
                aria-hidden="true"
              >
                <Image
                  className="object-cover"
                  src="/hippo-empty-cart.png"
                  fill
                  loading="eager"
                  alt="empty shopping cart"
                />
              </div>

              <h3 className="font-semibold text-2xl">Your cart is empty</h3>

              <p className="text-muted-foreground text-center">
                Whoops! Nothing to show here yet.
              </p>
            </div>
          )}

          <ul
            className={cn({
              "divide-y divide-gray-200 border-b border-t border-gray-200":
                items.length > 0,
            })}
          >
            {items.length > 0 &&
              items.map(({ product }) => {
                const { image } = product.images[0];

                const label = PRODUCT_CATEGORIES.find(
                  (c) => c.value === product.category
                )?.label;

                return (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="relative h-24 w-24 sm:h-48 sm:w-48 flex-shrink-0">
                      {typeof image !== "string" && image.url && (
                        <Image
                          className="h-full w-full rounded-md object-cover object-center"
                          src={image.url}
                          fill
                          alt="product image"
                        />
                      )}
                    </div>

                    <div className="flex-1 ml-4 sm:ml-6">
                      <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6 pr-9 sm:pr-0">
                        <div>
                          <h3 className="text-sm">
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Category: {label}
                          </p>

                          <p className="mt-1 text-sm text-gray-900 font-medium">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                          <div className="absolute right-0 top-0">
                            <Button
                              aria-label="remove product"
                              onClick={() => removeItem(product.id)}
                              variant="ghost"
                            >
                              <X className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <p className="flex gap-2 mt-4 text-sm text-gray-700">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                        <span>Eligible for instant delivery</span>
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <section className="bg-gray-50 px-4 py-6 sm:p-6 mt-16 lg:col-span-5 lg:mt-0 lg:p-8 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>

              <p className="text-sm font-medium text-gray-900">
                {formatPrice(cartTotal)}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Flat Transaction Fee</span>
              </div>

              <div className="text-sm font-medium text-gray-900">
                {formatPrice(fee)}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-gray-900">
                Order Total
              </div>

              <div className="text-base font-medium text-gray-900">
                {formatPrice(cartTotal + fee)}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="w-full disabled:cursor-not-allowed disabled:opacity-70"
              size="lg"
              type="button"
              disabled={items.length === 0 || isLoading}
              onClick={() =>
                createCheckoutSession({
                  productIds: [...items.map(({ product }) => product.id)],
                })
              }
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
              Checkout
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

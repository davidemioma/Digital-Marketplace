"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Cart = () => {
  const itemCount = 0;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center p-2 -m-2">
        <ShoppingCartIcon
          className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />

        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>

      <SheetContent className="w-full flex flex-col pr-0 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="py-2.5 pr-6">Cart (0)</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="w-full pr-6">
              <ScrollArea>Items</ScrollArea>
            </div>

            <div className="pr-6 space-y-4">
              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>

                  <span>Free</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>

                  <span>{formatPrice(200)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Total</span>

                  <span>{formatPrice(200)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-1">
            <div className="relative w-60 h-60 mb-4">
              <Image
                className="object-cover"
                src="/hippo-empty-cart.png"
                fill
                alt="empty-cart"
              />
            </div>

            <p className="text-xl font-semibold">Your cart is empty</p>

            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

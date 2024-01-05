"use client";

import React from "react";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import { PRODUCT_CATEGORIES } from "@/config";
import { ImageIcon, XIcon } from "lucide-react";

type Props = {
  item: Product;
};

const CartItem = ({ item }: Props) => {
  const { image } = item.images[0];

  const { removeItem } = useCart();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === item.category
  )?.label;

  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 min-w-fit aspect-square overflow-hidden rounded">
          {typeof image !== "string" && image.url ? (
            <Image
              className="object-cover"
              src={image.url}
              fill
              alt={item.name}
            />
          ) : (
            <div className="bg-secondary h-full flex items-center justify-center">
              <ImageIcon
                aria-hidden="true"
                className="h-4 w-4 text-muted-foreground"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col self-start">
          <span className="line-clamp-1 text-sm font-medium mb-1">
            {item.name}
          </span>

          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {label}
          </span>

          <div className="mt-4 text-xs text-muted-foreground">
            <button
              onClick={() => removeItem(item.id)}
              className="flex items-center gap-0.5"
            >
              <XIcon className="w-3 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-1 font-medium">
        <span className="ml-auto line-clamp-1 text-sm">
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;

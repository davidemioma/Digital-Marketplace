"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { Product } from "@/payload-types";
import { Skeleton } from "../ui/skeleton";
import { PRODUCT_CATEGORIES } from "@/config";
import { cn, formatPrice } from "@/lib/utils";

type Props = {
  product: Product | null;
  index: number;
};

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>

      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />

      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />

      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

const ProductItem = ({ product, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductSkeleton />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "w-full h-full invisible cursor-pointer",
        isVisible && "visible animate-in fade-in-5"
      )}
    >
      <div className="flex flex-col w-full">
        <ImageSlider urls={validUrls} />

        <h3 className="mt-4 text-sm text-gray-700 font-medium">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{label}</p>

        <p className="mt-1 text-sm text-gray-900 font-medium">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

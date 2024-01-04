"use client";

import React from "react";
import Link from "next/link";
import { trpc } from "@/lib/_trpcClient";
import { Product } from "@/payload-types";
import { QueryValidator } from "@/lib/validators/query";
import ProductItem from "./ProductItem";

type Props = {
  title: string;
  href?: string;
  subtitle?: string;
  query: QueryValidator;
};

const FALLBACK_LIMIT = 4;

const ProductList = ({ title, href, subtitle, query }: Props) => {
  const { data: results, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = results?.pages.flatMap((page) => page.products);

  let map: (Product | null)[] = [];

  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && (
            <h1 className="text-2xl sm:text-3xltext-gray-900 font-bold">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="hidden md:block text-sm text-blue-600 font-medium hover:text-blue-500"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:gap-x-8 mt-6">
        {map.map((product, index) => (
          <ProductItem key={product?.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;

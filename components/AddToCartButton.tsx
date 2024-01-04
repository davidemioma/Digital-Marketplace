"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/payload-types";

type Props = {
  product: Product;
};

const AddToCartButton = ({ product }: Props) => {
  const { addItem } = useCart();

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={() => {
        addItem(product);

        setIsSuccess(true);
      }}
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;

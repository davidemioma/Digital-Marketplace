"use client";

import React, { useEffect } from "react";
import { trpc } from "@/lib/_trpcClient";
import { useRouter } from "next/navigation";

type Props = {
  orderId: string;
  isPaid: boolean;
  orderEmail: string;
};

const PaymentStatus = ({ orderId, isPaid, orderEmail }: Props) => {
  const router = useRouter();

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  //This is a hook to refresh if the data?.isPaid is true to reflect in the frontend.
  useEffect(() => {
    if (data?.isPaid) {
      router.refresh();
    }
  }, [data?.isPaid, router]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-16 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>

        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order Status</p>

        <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;

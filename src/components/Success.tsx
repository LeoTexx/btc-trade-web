import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { satoshisToBtc } from "../utils";

interface Props {
  paymentData: InvoicePaidResponse;
}

export function Success({ paymentData }: Props) {
  useEffect(() => {
    toast.success("🎉 Payment successfully processed!");
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Success! 🥳</h1>
      <p className="mb-4 text-lg">
        Thanks for your purchase! You've added{" "}
        {satoshisToBtc(Number(paymentData.balanceAfter.amount))} BTC to your
        balance.
      </p>
      <p>Enjoy your day and thanks for choosing us!</p>
    </div>
  );
}

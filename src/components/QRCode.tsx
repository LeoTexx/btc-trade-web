import React, { useEffect, useState } from "react";
import ReactQRCode from "qrcode.react";
import { Button } from "./";
import { toast } from "react-hot-toast";
import { formatTime } from "../utils";

interface Props {
  invoice: string;
  initialSecondsLeft: number | null;
}

export const QRCode: React.FC<Props> = ({ invoice, initialSecondsLeft }) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    initialSecondsLeft
  );

  useEffect(() => {
    if (secondsLeft !== null && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [secondsLeft]);

  const handleCopyInvoice = () => {
    if (invoice) {
      navigator.clipboard
        .writeText(invoice)
        .then(() => {
          toast.success("Invoice copied to clipboard successfully!");
        })
        .catch(() => {
          toast.error("Failed to copy the invoice. Please try manually.");
        });
    }
  };

  return (
    <div className="flex flex-col items-center box-border">
      <h2 className=" text-gray-900 block font-lato text-2xl md:text-4xl font-bold h-16 leading-none">
        Scan the QR Code to Finalize Your Payment:
      </h2>
      <ReactQRCode value={invoice} />
      <p className="w-full bg-[#25d8bd] text-black font-semibold leading-4 p-4 rounded-lg my-6 shadow-xl">
        Invoice will expire in: {formatTime(secondsLeft || 0)}
      </p>
      <h3 className=" text-gray-900 block font-lato text-xl font-bold my-4 leading-none">
        Having trouble scanning?
      </h3>
      <p className=" text-[#9EA2A5] inline font-inter text-base font-normal h-auto leading-7 text-center mb-2">
        If you encounter issues with the QR code, consider using{" "}
        <a
          href="https://htlc.me"
          className="font-bold underline leading-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          this direct link
        </a>{" "}
        to process your payment.
      </p>
      <Button onClick={handleCopyInvoice} text="Copy Invoice Link" />
    </div>
  );
};

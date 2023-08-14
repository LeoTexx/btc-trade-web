import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { ApiService } from "../services";
import { toast } from "react-hot-toast";
import { QRCode } from ".";

export const Form: React.FC = () => {
  const apiService = new ApiService();
  const [eurAmount, setEurAmount] = useState<number | null>(null);
  const [btcEquivalent, setBtcEquivalent] = useState<number | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const handleEurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eur = parseFloat(event.target.value);
    setEurAmount(eur);
  };

  const handleSubmit = async () => {
    if (eurAmount) {
      try {
        const rate = await apiService.fetchRates();
        const btcValue = eurAmount / rate;
        setBtcEquivalent(btcValue);
      } catch (error) {
        toast.error(
          "Oops! We faced an issue fetching the latest conversion rates. Please try again later."
        );
      }
    }
  };

  const handleOrder = async () => {
    if (btcEquivalent) {
      try {
        const responseData = await apiService.postOrder(btcEquivalent);
        if (responseData && responseData.invoice && responseData.expiry) {
          setInvoice(responseData.invoice);
          setShowQRCode(true);
          toast.success(
            "Your order has been created! Please complete the payment."
          );

          const currentTime = Math.floor(Date.now() / 1000);
          const initialSecondsLeft = responseData.expiry - currentTime;
          setSecondsLeft(initialSecondsLeft);
        } else {
          toast.error(
            "We faced an issue initializing your payment. Please try again."
          );
        }
      } catch (error) {
        toast.error(
          "Oops! Something went wrong while placing your order. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    if (showQRCode && secondsLeft !== null && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showQRCode, secondsLeft]);

  return (
    <div className="flex items-center font-lato flex-col">
      {showQRCode && invoice ? (
        <QRCode invoice={invoice} initialSecondsLeft={secondsLeft} />
      ) : (
        <>
          <h1 className="box-border text-gray-900 block font-lato text-4xl font-bold h-16 leading-none">
            Buy Bitcoins
          </h1>

          <p>Now you can but your favorite crypto in a minute!</p>
          <div className="relative flex h-10 w-full my-4">
            <input
              type="number"
              value={eurAmount || ""}
              onChange={handleEurChange}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#ffc95e] focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              required
            />
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-[#ffc95e] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#ffc95e]/20 transition-all hover:shadow-lg hover:shadow-[#ffc95e]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleSubmit}
            >
              Convert
            </button>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#ffc95e] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#ffc95e] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#ffc95e] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter amount in EUR
            </label>
          </div>
          <div className="w-full bg-[#25d8bd] text-black font-semibold leading-4 p-4 rounded-lg mb-6">
            Equivalent BTC:{" "}
            <strong>{btcEquivalent ? btcEquivalent.toFixed(8) : "---"}</strong>
          </div>
          <Button text="Submit Order" onClick={handleOrder} />
        </>
      )}
    </div>
  );
};

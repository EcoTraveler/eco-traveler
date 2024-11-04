"use client";
import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [tokens, setTokens] = useState<number>(100);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const paypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://sandbox.paypal.com/sdk/js?client-id=Ae-TE-n5Zp3Wp-c8O94orElRqXc7ahEnlHnBplRyF6K0x9qC37cyNymubedDKIWqIkoN2PlIa19DIjZD";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

  const handleSelection = (amount: number, tokenCount: number) => {
    setSelectedAmount(amount);
    setTokens(tokenCount);
  };

  useEffect(() => {
    paypalScript();
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Ae-TE-n5Zp3Wp-c8O94orElRqXc7ahEnlHnBplRyF6K0x9qC37cyNymubedDKIWqIkoN2PlIa19DIjZD",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Pembayaran PayPal
          </h1>
          <p className="text-center text-gray-600">
            Pilih paket token yang ingin Anda beli melalui PayPal.
          </p>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleSelection(5, 100)}
              className={`w-full px-4 py-2 font-semibold border rounded ${
                selectedAmount === 5
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              $5 untuk 100 token
            </button>

            <button
              onClick={() => handleSelection(10, 200)}
              className={`w-full px-4 py-2 font-semibold border rounded ${
                selectedAmount === 10
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              $10 untuk 200 token
            </button>
          </div>

          {scriptLoaded ? (
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: selectedAmount.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions?.order?.capture().then((details) => {
                  alert(
                    `Pembayaran berhasil! Terima kasih, ${details?.payer?.name?.given_name}!`
                  );
                });
              }}
            />
          ) : (
            <span>Loading....</span>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalPage;

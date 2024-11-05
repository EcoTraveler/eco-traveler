//@ts-nocheck
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import React from "react";

interface PaypalType {
  amount: string;
  onSuccess: (details: any) => void;
}

const PPbuttons = ({ amount, onSuccess }: PaypalType) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env.NEXT_PUBLIC_PAYPAL_ROOM_CLIENT_ID ||
          "Ae-TE-n5Zp3Wp-c8O94orElRqXc7ahEnlHnBplRyF6K0x9qC37cyNymubedDKIWqIkoN2PlIa19DIjZD",
        currency: "USD",
      }}
    >
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order?.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("PayPal Button Error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PPbuttons;

"use client";

import React, { useEffect, useState } from "react";

const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bIY28h2OP1GAfpC6op"
        : "https://buy.stripe.com/prod_monthly_link", // Production link here
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QH39oGqVotCbPl1Ru2u03t1"
        : "price_production_monthly", // Production priceId here
    price: 5,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bIY0093STgBu6T67su"
        : "https://buy.stripe.com/prod_yearly_link", // Production link here
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QH3GzGqVotCbPl1k5zdJ71h"
        : "price_production_yearly", // Production priceId here
    price: 10,
    duration: "/year",
  },
];
type credential = {
  id: string;
  name: string;
  username: string;
  email: string;
};
const Pricing = () => {
  const [plan, setPlan] = useState(plans[0]);
  const [credential, setCredential] = useState<credential>({
    id: "",
    name: "",
    username: "",
    email: "", // Default value or an empty string
  });

  useEffect(() => {
    const readPayload = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-credential`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          console.log("Credential error:", await response.json());

          return;
        }

        const data = await response.json();
        console.log(data, "Credential data");
        setCredential(data);
      } catch (error) {
        console.error("Error fetching credential:", error);
      }
    };
    readPayload();
  }, []);

  return (
    <>
      <section id="pricing">
        <div className="py-24 px-8 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="font-medium text-primary mb-5">Pricing</p>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
              Hello YouTube
            </h2>
          </div>

          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            <div className="w-full max-w-lg">
              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
                <div className="flex items-center gap-8">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[0])}>
                    <input
                      type="radio"
                      name="monthly"
                      className="radio"
                      checked={plan.price === 5}
                    />
                    <span>Pay monthly</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[1])}>
                    <input
                      type="radio"
                      name="yearly"
                      className="radio"
                      checked={plan.price === 10}
                    />
                    <span>Pay yearly (60% OFF 💰)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="text-5xl tracking-tight font-extrabold">
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                      {plan.duration}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  {[
                    { name: "NextJS boilerplate" },
                    { name: "User oauth" },
                    { name: "Database" },
                    { name: "Emails" },
                    { name: "1 year of updates" },
                    { name: "24/7 support" },
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-[18px] h-[18px] opacity-80 shrink-0">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <a
                    className="btn btn-primary btn-block"
                    target="_blank"
                    href={`${plan.link}?prefilled_email=${credential?.email}`}>
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;

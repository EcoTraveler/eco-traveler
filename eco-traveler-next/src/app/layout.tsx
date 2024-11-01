import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoTraveler",
  description: "Plan and book our perfect trip with expert advice, travel tips, destination information and inspiration from us",
  icons: {
    icon: "/assets/EcoTraveler.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animated-bg {
            background: linear-gradient(-45deg, #77CDFF, #FEFDED, #66DE93, #FF4545);
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -3;
          }

          .blur-overlay {
            backdrop-filter: blur(20px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -2;
          }

          .white-overlay {
            background: rgba(255, 255, 255, 0.50);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
          }
        `}</style>
      </head>
      <body>
        <div className="animated-bg"></div>
        <div className="blur-overlay"></div>
        <div className="white-overlay"></div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

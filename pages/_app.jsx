import "./globals.css";
import { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { geistSans, geistMono } from "@/config/font";

export const metadata = {
  title: "Wedding of Dita & Galih",
  description: "Wedding of Dita & Galih",
};

export default function App({ Component, pageProps }) {
  return (
    <Suspense>
      <NextUIProvider locale="en-GB">
        <div className="min-h-screen bg-white light text-foreground">
          <Component {...pageProps} />
        </div>
      </NextUIProvider>{" "}
    </Suspense>
  );
}

export const fonts = {
  sans: geistSans.style.fontFamily,
  mono: geistMono.style.fontFamily,
};

import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";
import { geistSans, geistMono } from "@/config/font";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          geistMono.variable,
          geistSans.variable
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

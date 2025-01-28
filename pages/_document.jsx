import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";
import { geistSans, geistMono } from "@/config/font";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:site_name" content="Wedding Invitation"></meta>
        <meta
          name="description"
          content="Wedding Invitation Dita &amp; Galih - 8 Februari 2025"
        />
        <link rel="icon" href="/assets/flower (3)-mini.png" />
        <link rel="canonical" href="https://mydreamwedding.arsadev.tech/" />
        <meta property="og:title" content="Wedding of Dita &amp; Galih" />
        <meta
          property="og:description"
          content="Wedding Invitation Dita &amp; Galih - 8 Februari 2025"
        />
        <meta
          property="og:url"
          content="https://mydreamwedding.arsadev.tech/"
        />
        <meta
          property="og:image"
          content="https://mydreamwedding.arsadev.tech/assets/ogimage.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:updated_time" content={new Date().getTime()} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="admin" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="4 minutes" />
      </Head>
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

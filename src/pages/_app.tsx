import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "~/styles/globals.css";
import { useServiceWorker } from "~/utils/useServiceWorker";

const MyApp: AppType = ({ Component, pageProps }) => {
  useServiceWorker();

  return (
    <>
      <Head>
        <title>Japanese Dictionary</title>
        <meta
          name="description"
          content="A Japanese progressive web app written with React, TypeScript, Next.js, TailwindCSS, and Zustand. Inspired by Pleco. Initialized with create-t3-app."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

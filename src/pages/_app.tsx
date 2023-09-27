import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Japleco</title>
        <meta
          name="description"
          content="A Japanese Pleco clone web app written with React, TypeScript, Next.js, TailwindCSS, and Zustand."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#333" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

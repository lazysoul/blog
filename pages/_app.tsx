import "tailwindcss/tailwind.css";

import '../styles/globals.css';
import Layout from '../components/Layout';

import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import { Auth0Provider } from "@auth0/auth0-react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lazysoul.com/" />
        <meta property="og:title" content="I value the beauty of taking things slowly in development." />
        <meta property="og:description" content="I enjoy learning new technologies and methodologies, and I'd like to share the insights and experiences gained through various experiments with other developers. Let me share my journey as a developer who grows steadily, albeit slowly." />
        <meta property="og:image" content="https://lazysoul.com/lazysoul-tortoise.png" />


        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="I enjoy learning new technologies and methodologies, and I'd like to share the insights and experiences gained through various experiments with other developers. Let me share my journey as a developer who grows steadily, albeit slowly."
        />
        <title>I value the beauty of taking things slowly in development.</title>
      </Head>

      <Header />

      <Layout>
        <main className="py-14">
          <Component {...pageProps} />
        </main>
      </Layout>
    </Auth0Provider>
  );
}

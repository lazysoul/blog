import { AppProps } from "next/app";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";

import "tailwindcss/tailwind.css";
import '../styles/globals.css';

import Layout from '../components/Layout';
import Header from "../components/header";

const META_DESCRIPTION = "I enjoy learning new technologies and methodologies, and I'd like to share the insights and experiences gained through various experiments with other developers. Let me share my journey as a developer who grows steadily, albeit slowly.";
const META_TITLE = "I value the beauty of taking things slowly in development.";
const SITE_URL = "https://lazysoul.com/";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={META_DESCRIPTION} />
        <title>{META_TITLE}</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}lazysoul-tortoise.png`} />
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

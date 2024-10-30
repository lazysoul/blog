import { AppProps } from "next/app";
import Head from "next/head";
import Script from 'next/script';
import { Auth0Provider } from "@auth0/auth0-react";

import "tailwindcss/tailwind.css";
import '../styles/globals.css';

import Layout from '../components/Layout';
import Header from "../components/header";

// Constants
const CONFIG = {
  analytics: {
    id: 'G-XVKFQF478G'
  },
  meta: {
    title: "I value the beauty of taking things slowly in development.",
    description: "I enjoy learning new technologies and methodologies, and I'd like to share the insights and experiences gained through various experiments with other developers. Let me share my journey as a developer who grows steadily, albeit slowly.",
    url: "https://lazysoul.com/",
    image: "lazysoul-tortoise.png"
  }
};

function MetaTags() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={CONFIG.meta.description} />
      <title>{CONFIG.meta.title}</title>

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CONFIG.meta.url} />
      <meta property="og:title" content={CONFIG.meta.title} />
      <meta property="og:description" content={CONFIG.meta.description} />
      <meta 
        property="og:image" 
        content={`${CONFIG.meta.url}${CONFIG.meta.image}`} 
      />
    </Head>
  );
}

function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.analytics.id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONFIG.analytics.id}');
          `,
        }}
      />
    </>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <MetaTags />
      <GoogleAnalytics />
      <Header />
      <Layout>
        <main className="py-14">
          <Component {...pageProps} />
        </main>
      </Layout>
    </Auth0Provider>
  );
}
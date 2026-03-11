import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
)
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const handleRouteChange = (url: string) => {
      window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, GA_MEASUREMENT_ID]);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;

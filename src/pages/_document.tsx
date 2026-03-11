import { Html, Head, Main, NextScript } from 'next/document';

const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
)
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : undefined;

export default function Document() {
  return (
    <Html>
      <Head>
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
                `,
              }}
            />
          </>
        )}
      </Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

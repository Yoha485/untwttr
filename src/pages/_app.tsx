import '../styles/globals.scss';
import '../styles/reset.scss';

import { Londrina_Solid } from '@next/font/google';
import localFont from '@next/font/local';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const londrinaSolid = Londrina_Solid({
  subsets: ['latin'],
  weight: ['100', '300', '400', '900']
});

const sudo = localFont({
  src: [
    {
      path: '../../public/fonts/SudoLight.woff2',
      weight: '300'
    },
    {
      path: '../../public/fonts/SudoBold.woff2',
      weight: '700'
    }
  ],
  fallback: ['Helvetica', 'ui-sans-serif']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={londrinaSolid.className}>
      <style jsx global>{`
        :root {
          --font-sudo: ${sudo.style.fontFamily};
        }
      `}</style>

      <Head>
        <title>UNTWTR</title>
        <meta name="description" content="Like twtr, but more fun!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </div>
  );
}

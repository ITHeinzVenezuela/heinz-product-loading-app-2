import type { AppProps } from 'next/app';
import CartContextProvider from '@/context/CartContextProvider'
import "tailwindcss/tailwind.css"
import '../styles/App.scss'
import BillsContextProvider from '@/context/BillsContextProvider';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps:{ session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <BillsContextProvider>
          <Component {...pageProps} />
        </BillsContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
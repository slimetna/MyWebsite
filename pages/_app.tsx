import type { AppProps } from 'next/app'
import store from '../app/store'
import { Provider } from 'react-redux'
import { CartProvider } from 'react-use-cart'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Provider>
  );
}

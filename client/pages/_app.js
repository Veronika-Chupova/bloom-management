import '../styles/styles.css'
import { Provider } from "react-redux"
import { wrapper } from "../store/store"
import Head from 'next/head'
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps)
  return <>
    <Head>
        <link rel="icon" href="/assets/menu-logo.png" />
        {/* Optionally: Include other favicon formats for better browser compatibility */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" /> */}
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

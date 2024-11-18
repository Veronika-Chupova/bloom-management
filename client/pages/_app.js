import '../styles/styles.css'
import Head from "next/head"
import { Provider } from "react-redux"
// import store from "../store/store"
import { wrapper } from "../store/store"
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps)
  return <>
    {/* <Head>
      <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    </Head> */}
    
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

//  wrapper.withRedux(MyApp)
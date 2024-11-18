import '../styles/styles.css'
import { Provider } from "react-redux"
import { wrapper } from "../store/store"
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // const { store } = wrapper.useWrappedStore(pageProps)
  return <>
    {/* <Provider store={store}> */}
      <Component {...pageProps} />
    {/* </Provider> */}
  </>
}

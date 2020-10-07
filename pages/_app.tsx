import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { AppProps } from 'next/app'
import store from '../store/store'
//import('bootstrap')

// Styles
import '../styles/globals.scss'
import '../styles/navbar.scss'
import '../styles/footer.scss'
import 'bootstrap/dist/css/bootstrap.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)

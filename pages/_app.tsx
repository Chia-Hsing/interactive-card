import '../styles/globals.css'
import '../styles/App.scss'
import '../styles/Card.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp

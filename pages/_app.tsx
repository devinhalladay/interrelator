import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <div className="w-full h-full">
    <Component {...pageProps} />
  </div>
}

export default App

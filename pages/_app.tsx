import '../styles/globals.css'
import '@elastic/eui/dist/eui_theme_light.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp

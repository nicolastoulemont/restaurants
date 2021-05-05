import 'instantsearch.css/themes/satellite.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>
				{`
					* {
						box-sizing: border-box;
					}

					html,
					body,
					#__next {
						min-height: 100vh;
						height: auto;
						width: 100%;
					}
				`}
			</style>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	)
}

export default MyApp

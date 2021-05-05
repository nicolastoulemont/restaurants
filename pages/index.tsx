import Head from 'next/head'
import { algoliaSearchClient, ALGOLIA_INDEX_NAME } from 'lib/algolia'
import { RefreshSearchContext } from 'lib/context'
import { useState } from 'react'
import { CustomHits } from 'layouts'
import { Container, MobileDrawer } from 'components'
import { Box, Flex, Heading, Divider, IconButton } from '@chakra-ui/react'
import { FiSliders } from 'react-icons/fi'
import {
	InstantSearch,
	SearchBox,
	Pagination,
	ClearRefinements,
	RefinementList,
	HitsPerPage
} from 'react-instantsearch-dom'

export default function Home() {
	const [refreshSearch, setRefreshSearch] = useState(false)
	const [mobileFilterPanelOpen, setMobileFilterPanelOpen] = useState(false)

	function refreshSearchCache() {
		setRefreshSearch(true)
		setRefreshSearch(false)
	}

	return (
		<>
			<Head>
				<title>Algolia test</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<RefreshSearchContext.Provider value={{ setRefreshSearch: refreshSearchCache }}>
				<Container>
					<Heading as='h1' size='xl' mb={6} ml={6}>
						Algolia test
					</Heading>
					<InstantSearch
						searchClient={algoliaSearchClient}
						indexName={ALGOLIA_INDEX_NAME}
						refresh={refreshSearch}
					>
						<Box as='section' w='100%' mb={{ base: 3, md: 6 }} p={{ base: 3, md: 6 }}>
							<SearchBox />
						</Box>
						<Flex w='100%' align='stretch' justify='space-between'>
							<Flex
								display={{ base: 'none', md: 'flex' }}
								w={{ base: 0, md: '33%' }}
								flexDir='column'
								align='left'
								justify='flex-start'
								px={6}
							>
								<Box w='100%'>
									<Heading size='md' as='h2' mb={6}>
										Food types
									</Heading>
									<RefinementList attribute='food_type' />
									<ClearRefinements />
								</Box>

								<Divider my={6} />

								<Box w='100%'>
									<Heading size='md' as='h2' mb={6}>
										Number of results per page
									</Heading>
									<HitsPerPage
										defaultRefinement={5}
										items={[
											{ value: 5, label: 'Show 5 hits' },
											{ value: 10, label: 'Show 10 hits' }
										]}
									/>
								</Box>
							</Flex>
							<Box w={{ base: '100%', md: '66%' }} px={{ base: 3, md: 6 }}>
								<CustomHits />
								<Flex w='100%' justify='center' align='center' my={6}>
									<Pagination padding={1} />
								</Flex>
							</Box>
						</Flex>

						<MobileDrawer
							open={mobileFilterPanelOpen}
							onClose={() => setMobileFilterPanelOpen(false)}
							title='Filters'
						>
							<>
								<Box w='100%'>
									<Heading size='md' as='h2' mb={6}>
										Food types
									</Heading>
									<RefinementList attribute='food_type' />
									<ClearRefinements />
								</Box>

								<Divider my={6} />

								<Box w='100%' pb={6}>
									<Heading size='md' as='h2' mb={6}>
										Number of results per page
									</Heading>
									<HitsPerPage
										defaultRefinement={5}
										items={[
											{ value: 5, label: 'Show 5 hits' },
											{ value: 10, label: 'Show 10 hits' }
										]}
									/>
								</Box>
							</>
						</MobileDrawer>
					</InstantSearch>
					<IconButton
						pos='fixed'
						bottom='50px'
						right='25px'
						display={{ base: 'flex', md: 'none' }}
						aria-label='Filters'
						onClick={() => setMobileFilterPanelOpen(true)}
						bg='blackAlpha.800'
						_hover={{ bg: 'blackAlpha.800' }}
						color='white'
						borderRadius='20px'
						fontWeight='normal'
						boxShadow='rgba(0, 0, 0, 0.5) 0px 8px 12px'
						icon={<FiSliders style={{ transform: 'rotate(90deg)' }} color='white' />}
					/>
				</Container>
			</RefreshSearchContext.Provider>
		</>
	)
}

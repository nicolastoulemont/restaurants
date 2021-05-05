import algoliasearch from 'algoliasearch'
import { ALGOLIA_INDEX_NAME, ALGOLIA_APP_ID } from './common'

export const algoliaSearchClient = algoliasearch(
	ALGOLIA_APP_ID,
	String(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY)
)

export const algoliaSearchIndex = algoliaSearchClient.initIndex(ALGOLIA_INDEX_NAME)

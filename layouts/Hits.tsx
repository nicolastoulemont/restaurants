import { connectHits } from 'react-instantsearch-dom'
import { RestaurantInfos } from 'types'
import { RestaurantCard } from 'components'
import { UnorderedList } from '@chakra-ui/react'
interface HitsProps {
	hits: Array<RestaurantInfos>
}

const Hits = ({ hits }: HitsProps) => (
	<UnorderedList ml={0}>
		{hits.map((hit) => (
			<RestaurantCard key={hit.objectID} hit={hit} />
		))}
	</UnorderedList>
)

export const CustomHits = connectHits(Hits)

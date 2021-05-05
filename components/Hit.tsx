import { Highlight } from 'react-instantsearch-dom'
import { RestaurantInfos } from 'types'
import { isError } from 'types/utils'
import { useContext, useState } from 'react'
import { deleteIndexedObject, deleteObjectIndex, algoliaSearchIndex } from 'lib/algolia'
import { RefreshSearchContext } from 'lib/context'
import {
	ListItem,
	Image,
	Flex,
	Heading,
	Text,
	Tag,
	TagLabel,
	Link,
	Box,
	ThemingProps,
	Button,
	useToast
} from '@chakra-ui/react'

const CARD_COLORSCHEME: Record<
	string,
	Extract<ThemingProps['colorScheme'], 'red' | 'blue' | 'orange' | 'cyan' | 'gray'>
> = {
	AMEX: 'red',
	'Diners Club': 'blue',
	Discover: 'orange',
	MasterCard: 'cyan',
	Visa: 'gray'
}
export function RestaurantCard({ hit }: { hit: RestaurantInfos }) {
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const context = useContext(RefreshSearchContext)

	async function deleteItem() {
		setIsLoading(true)
		const response = await deleteIndexedObject(hit.objectID)
		if (isError(response)) {
			toast({
				title: response.error,
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		} else if (response?.taskID) {
			await deleteObjectIndex.waitTask(response?.taskID)
			context.setRefreshSearch()
			algoliaSearchIndex.search('')
			toast({
				title: 'Item deleted',
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		}
		setIsLoading(false)
	}

	return (
		<ListItem
			p={{ base: 3, md: 6 }}
			borderRadius='10px'
			my={3}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			_hover={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px' }}
			transition='box-shadow 0.3s ease-in-out'
			display='flex'
			flexDir={{ base: 'column', md: 'row' }}
			alignItems='start'
			justifyContent='flex-start'
			w='100%'
		>
			<Image
				src={hit.image_url}
				fallbackSrc={hit.image_url}
				alt={hit.name}
				width={{ base: '100%', md: '150px', lg: '200px' }}
				height={{ base: '150px', lg: '200px' }}
				borderRadius='10px'
				objectFit='cover'
				mb={{ base: 3, md: 0 }}
			/>
			<Flex
				flex='1'
				w={{ base: '100%', md: 'unset' }}
				flexDir='column'
				ml={{ base: 0, md: 5 }}
			>
				<Flex align='center' justify='flex-start' w='auto' mb={2}>
					<Heading size='sm' as='h3'>
						<Highlight attribute='name' hit={hit} />
					</Heading>
					<Flex
						align='center'
						justify='flex-start'
						w='auto'
						ml={2}
						aria-label={`Rating ${hit.stars_count} out of 5`}
					>
						<Image
							src='/icon/star.svg'
							fallbackSrc='/icon/star.svg'
							alt='star'
							mr={1}
							w='16px'
							h='16px'
						/>
						<Text>{hit.stars_count}</Text>
						<Text ml={1} fontWeight={400} fontSize='sm' color='gray.600'>
							({hit.reviews_count})
						</Text>
					</Flex>
				</Flex>
				<Text mb={2}>
					<Text as='span' fontWeight={600}>
						{hit.price_range}
					</Text>
					<Box as='span' mx={2}>
						-
					</Box>
					<Text as='span' fontStyle='italic' color='gray.500'>
						{hit.food_type}
					</Text>
					<Box as='span' mx={2}>
						-
					</Box>
					<Text as='span' fontStyle='italic' color='gray.500'>
						{hit.dining_style}
					</Text>
				</Text>
				<Text mb={2}>
					{hit.address}, {hit.city}
					<Text as='span' color='gray.600' fontSize='sm' fontStyle='italic'>
						, {hit.area}, {hit.state}, {hit.country}
					</Text>
				</Text>

				<Link href={`tel:${hit.phone_number}`} fontSize='sm' color='gray.600'>
					{hit.phone_number}
				</Link>

				<Link
					href={hit.reserve_url}
					isExternal
					display={{ base: 'none', md: 'inline' }}
					color='blue.400'
					fontWeight={500}
					fontSize='sm'
					textDecor='underline'
				>
					Book
				</Link>
				<Link
					href={hit.mobile_reserve_url}
					isExternal
					display={{ base: 'inline', md: 'none' }}
					color='blue.400'
					fontWeight={500}
					fontSize='md'
					textDecor='underline'
				>
					Book
				</Link>

				<Flex wrap='wrap' w='100%' mt={2}>
					{hit.payment_options.map((option) => (
						<Tag
							size='sm'
							key={option}
							mr={1}
							mb={1}
							colorScheme={CARD_COLORSCHEME[option]}
						>
							<Image
								src='icon/check.svg'
								fallbackSrc='icon/check.svg'
								w='16px'
								h='16px'
								alt='check'
								mr={1}
							/>
							<TagLabel>{option}</TagLabel>
						</Tag>
					))}
				</Flex>
				<Flex w='100%' align='center' justify='flex-end' mt={2}>
					<Button size='sm' onClick={deleteItem} isLoading={isLoading}>
						Remove restaurant
					</Button>
				</Flex>
			</Flex>
		</ListItem>
	)
}

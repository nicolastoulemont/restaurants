import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { RemoveScroll } from 'react-remove-scroll'
import { ReactNode, useRef } from 'react'
import { MdClose } from 'react-icons/md'
import { useClickAway } from 'react-use'

interface MobileDrawer {
	open: boolean
	onClose: () => void
	children: ReactNode
	title: string
}

export function MobileDrawer({ open, onClose, title, children }: MobileDrawer) {
	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => onClose())
	return (
		<RemoveScroll enabled={open}>
			<Box
				ref={containerRef}
				w='100%'
				h='calc(100vh-160px)'
				pos='fixed'
				display={open ? 'block' : 'none'}
				left={0}
				bottom={0}
				zIndex={999}
				bgColor='white'
				borderTopLeftRadius='10px'
				borderTopRightRadius='10px'
				p={6}
				boxShadow='1px 2px 18px rgba(0,0,0,.4)'
			>
				<Flex w='100%' align='center' justify='space-between' mb={3}>
					<Heading as='h3'>{title}</Heading>
					<IconButton
						aria-label='Close'
						onClick={onClose}
						icon={<MdClose height='16px' width='16px' />}
						borderRadius='20px'
						bg='blackAlpha.800'
						_hover={{ bg: 'blackAlpha.800' }}
						color='white'
					/>
				</Flex>
				<Box w='100%'>{children}</Box>
			</Box>
		</RemoveScroll>
	)
}

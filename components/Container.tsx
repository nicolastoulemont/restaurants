import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

export function Container({ children }: { children: ReactNode }) {
	return (
		<Box as='main' w='100%' p={{ base: 3, md: 6 }} maxW='1200px' mx='auto' pos='relative'>
			{children}
		</Box>
	)
}

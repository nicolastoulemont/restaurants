interface ErrorResult {
	error: string
}

// Type guard
export function isError(item: any): item is ErrorResult {
	return item && item.error !== undefined
}

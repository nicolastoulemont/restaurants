import { createContext } from 'react'
export const RefreshSearchContext = createContext<{ setRefreshSearch: () => void }>({
	setRefreshSearch: () => {}
})

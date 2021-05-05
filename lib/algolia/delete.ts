import algoliasearch from 'algoliasearch'
import { ALGOLIA_INDEX_NAME, ALGOLIA_APP_ID } from './common'

const deleteObjectClient = algoliasearch(
	String(ALGOLIA_APP_ID),
	String(process.env.NEXT_PUBLIC_ALGOLIA_DELETE_KEY)
)
export const deleteObjectIndex = deleteObjectClient.initIndex(ALGOLIA_INDEX_NAME)

export async function deleteIndexedObject(objectId: string) {
	try {
		return await deleteObjectIndex.deleteObject(objectId)
	} catch (error) {
		if (process.env.NODE_ENV === 'production') {
			// handle error logging based on the chosen error logging service (for example: sentry or others)
		} else {
			console.error(error)
			return { error: "Couldn't delete the item" }
		}
	}
}

import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'

export default defineEventHandler({
    onRequest: [tokenAuthorization()],
    handler: errorHandler(async (event) => {
        const { userData } = event.context
        const { id: userId } = userData
        const id = getRouterParam(event, 'id')

        const db = initialFirestore()
        const postSnapshot = await db.collection('posts').doc(id).get()
        if (!postSnapshot.exists) throw createError(ResourceInvalidError404)

        const postData = postSnapshot.data()
        if (postData.post_user_id !== userId) throw createError(ResourceInvalidError404)

        try {
            const postCollections = await db.collection('posts').doc(id).listCollections();
            await db.collection('posts').doc(id).delete()
            const collectionSnapshots = [];
            postCollections.forEach((collection) => {
                collectionSnapshots.push(collection)
            })
            const writeBatch = db.batch()
            await Promise.all(collectionSnapshots.map(async (snapshot) => {
                const result = await snapshot.get();
                result.docs.forEach((doc) => writeBatch.delete(doc.ref));
            }))
            await writeBatch.commit()

            return { result: true }
        } catch (error) {
            throw createError(DatabaseOperationError500)
        }
    })
})
import firebase from 'firebase-admin'

import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
    onRequest: [tokenAuthorization()],
    handler: errorHandler(async (event) => {
        const { userData } = event.context
        const { id: userId } = userData

        try {
            const db = initialFirestore()
            const collectionRef = await db.collection('collections').doc(userId).get()
            const collectionPosts = []
            if (!collectionRef.exists) return { collection_posts: collectionPosts }

            const data = collectionRef.data()
            const { collections } = data
            const chunkSize = 10
            const chunks = []

            for (let i = 0; i < collections.length; i += chunkSize) {
                chunks.push(collections.slice(i, i + chunkSize))
            }

            const results = await Promise.all(chunks.map(async (chunk) => {
                const result = await db
                    .collection('posts')
                    .where(firebase.firestore.FieldPath.documentId(), 'in', chunk)
                    .get()
                return result
            }))

            results.forEach((querySnapshot) => {
                querySnapshot.forEach((snapshot) => {
                    const data = snapshot.data()
                    const id = snapshot.id
                    const postData = {
                        ...data,
                        post_created_time: data.post_created_time._seconds * 1000,
                        post_id: id
                    }
                    collectionPosts.push(postData)
                })
            })

            collectionPosts.sort((a, b) => b.post_created_time - a.post_created_time)

            return { collection_posts: collectionPosts }
        } catch (error) {
            throw createError(DatabaseOperationError500)
        }
    })
})
import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    try {
      const { userData } = event.context
      const db = initialFirestore()
      const postsQuerySnapshot = await db
        .collection('posts')
        .orderBy('post_created_time', 'desc')
        .get()
      const posts = []

      postsQuerySnapshot.forEach((snapshot) => posts.push(snapshot))
      const result = await Promise.all(posts.map(async (snapshot) => {
        const likesCollection = await snapshot.ref.collection(userData.id).get()
        const data = snapshot.data()
        const id = snapshot.id
        const postData = {
          ...data,
          post_self: userData.id === data.post_user_id,
          post_likable: likesCollection.empty,
          post_likes: likesCollection.size,
          post_id: id,
          post_created_time: data.post_created_time._seconds * 1000
        }
        return postData
      }))

      result.sort((a, b) => b.post_created_time - a.post_created_time)

      return { posts: result }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

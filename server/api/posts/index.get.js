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
      const usersQuerySnapshot = await db.collection('users').get()
      const posts = []
      const userMap = new Map()
      usersQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        userMap.set(id, data)
      })

      postsQuerySnapshot.forEach((snapshot) => posts.push(snapshot))
      const result = await Promise.all(
        posts.map(async (snapshot) => {
          const likesCollection = await snapshot.ref.collection(userData.id).get()
          const likeCollections = await snapshot.ref.listCollections()
          const data = snapshot.data()
          const id = snapshot.id
          const postUser = userMap.get(data.post_user_id) || {}
          const postUsername = postUser.username || ''
          const postData = {
            ...data,
            post_self: userData.id === data.post_user_id,
            post_username: postUsername,
            post_likable: likesCollection.empty,
            post_likes: likeCollections.length,
            post_id: id,
            post_created_time: data.post_created_time._seconds * 1000
          }
          return postData
        })
      )

      result.sort((a, b) => b.post_created_time - a.post_created_time)

      return { posts: result }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

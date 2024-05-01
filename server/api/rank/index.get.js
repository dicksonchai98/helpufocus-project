import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async () => {
    try {
      const db = initialFirestore()
      const usersQuerySnapshot = await db.collection('users').get()
      const booksQuerySnapshot = await db.collection('books').get()
      const userBookdMap = new Map()
      const userArray = []

      booksQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const { book_user_id: bookUserId } = data
        if (userBookdMap.has(bookUserId)) {
          let [finished, total] = userBookdMap.get(bookUserId)
          total += 1
          if (data.book_read_page === data.book_total_page) {
            finished += 1
          }
          userBookdMap.set(bookUserId, [finished, total])
        } else {
          const progress = [data.book_read_page === data.book_total_page ? 1 : 0, 1]
          userBookdMap.set(bookUserId, progress)
        }
      })

      usersQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        const [finished, total] = userBookdMap.get(id) || [0, 0]
        const userData = {
          user_id: id,
          username: data.username,
          books_finished: finished,
          books_total: total
        }
        userArray.push(userData)
      })

      return { rank: userArray }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

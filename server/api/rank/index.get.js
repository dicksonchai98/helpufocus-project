import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    try {
      const { userData } = event.context
      const { id: userId } = userData
      const query = getQuery(event)
      const { type = 'all' } = query
      const db = initialFirestore()
      const usersQuerySnapshot = await db.collection('users').get()
      const booksQuerySnapshot = await db.collection('books').get()
      const userBookMap = new Map()
      const userArray = []
      let follows = []

      booksQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const { book_user_id: bookUserId } = data
        if (userBookMap.has(bookUserId)) {
          let [finished, total] = userBookMap.get(bookUserId)
          total += 1
          if (data.book_read_page === data.book_total_page) {
            finished += 1
          }
          userBookMap.set(bookUserId, [finished, total])
        } else {
          const progress = [data.book_read_page === data.book_total_page ? 1 : 0, 1]
          userBookMap.set(bookUserId, progress)
        }
      })

      if (type === 'follow') {
        const followsRef = await db.collection('follows').doc(userId).get()
        const data = followsRef.data()
        follows = data.follows
      }

      usersQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        if (type === 'follow') {
          const followOrNot = follows.includes(id)
          if (!followOrNot && id !== userId) return
        }
        const [finished, total] = userBookMap.get(id) || [0, 0]
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

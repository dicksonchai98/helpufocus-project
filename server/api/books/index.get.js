import { ref, getDownloadURL } from 'firebase/storage'

import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    try {
      const db = initialFirestore()
      const storage = initialStorage()
      const booksQuerySnapshot = await db
        .collection('books')
        .where('book_user_id', '==', userData.id)
        .get()
      const books = []
      booksQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const formatData = {
          ...data,
          book_created_time: data.book_created_time._seconds * 1000,
          book_updated_time: data.book_updated_time._seconds * 1000
        }
        books.push({ ...formatData, book_id: snapshot.id })
      })

      const addUrlBooks = await Promise.all(
        books.map(async (book) => {
          try {
            const url = await getDownloadURL(ref(storage, `books/${userData.id}/${book.book_id}`))
            return { ...book, book_image_url: url }
          } catch (error) {
            return { ...book, book_image_url: '' }
          }
        })
      )

      return { books: addUrlBooks }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    try {
      const { userData } = event.context
      const db = initialFirestore()
      const notes = []
      const booksMap = new Map()
      const notesQuerySnapshot = await db
        .collection('notes')
        .select('note_book_id', 'note_title', 'note_created_time', 'note_updated_time')
        .where('note_user_id', '==', userData.id)
        .get()
      const booksQuerySnapshot = await db
        .collection('books')
        .where('book_user_id', '==', userData.id)
        .get()

      booksQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        booksMap.set(id, data)
      })

      notesQuerySnapshot.forEach((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        let bookName = ''

        if (booksMap.has(data.note_book_id)) {
          const bookData = booksMap.get(data.note_book_id) || {}
          bookName = bookData.book_name || ''
        }

        notes.push({
          ...data,
          note_id: id,
          note_book_name: bookName,
          note_created_time: data.note_created_time._seconds * 1000,
          note_updated_time: data.note_updated_time._seconds * 1000
        })
      })

      return { notes }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

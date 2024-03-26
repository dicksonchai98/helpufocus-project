import { Filter } from 'firebase-admin/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const id = getRouterParam(event, 'id')

    try {
      const db = initialFirestore()
      const storage = initialStorage()

      const bookSnapshot = await db.collection('books').doc(id).get()
      if (!bookSnapshot.exists) throw createError(ResourceInvalidError404)
      const bookData = bookSnapshot.data()
      const formatBookData = {
        ...bookData,
        book_id: id,
        book_created_time: bookData.book_created_time._seconds * 1000,
        book_updated_time: bookData.book_updated_time._seconds * 1000
      }

      const notesFilter = Filter.and(
        Filter.where('note_book_id', '==', id),
        Filter.where('note_user_id', '==', userData.id)
      )
      const notesQuerySnapshot = await db
        .collection('notes')
        .select('note_title', 'note_created_time', 'note_updated_time')
        .where(notesFilter)
        .get()
      const notes = []
      notesQuerySnapshot.forEach((snapshot) => {
        const id = snapshot.id
        const data = snapshot.data()
        notes.push({
          ...data,
          note_id: id,
          note_created_time: data.note_created_time._seconds * 1000,
          note_updated_time: data.note_updated_time._seconds * 1000,
        })
      })

      let url = ''
      try {
        url = await getDownloadURL(ref(storage, `books/${userData.id}/${id}`))
      } catch (error) {
        url = ''
      }

      return { notes, ...formatBookData, book_image_url: url }
    } catch (error) {
      if (error.data) throw error
      throw createError(DatabaseOperationError500)
    }
  })
})

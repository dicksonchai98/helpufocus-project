import firebase from 'firebase-admin'
import { Filter } from 'firebase-admin/firestore'

import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { addNoteSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const body = await readBody(event)
    const validator = new Validator({ schema: addNoteSchema })
    const {
      note_title: noteTitle,
      note_content: noteContent = '',
      note_book_id: noteBookId
    } = await validator.validate(body)
    const { userData } = event.context
    const noteData = {
      note_user_id: userData.id,
      note_book_id: noteBookId,
      note_title: noteTitle,
      note_content: noteContent,
      note_created_time: firebase.firestore.FieldValue.serverTimestamp(),
      note_updated_time: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = initialFirestore()
    const bookFilter = Filter.and(
      Filter.where(firebase.firestore.FieldPath.documentId(), '==', noteBookId),
      Filter.where('book_user_id', '==', userData.id)
    )
    const queryBook = await db.collection('books').where(bookFilter).get()
    if (queryBook.empty) throw createError(ResourceInvalidError404)

    try {
      const notesRef = db.collection('notes')
      const result = await notesRef.add(noteData)

      return { note_id: result.id }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

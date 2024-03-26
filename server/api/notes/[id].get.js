import { DatabaseOperationError500 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    try {
      const db = initialFirestore()

      const noteSnapshot = await db.collection('notes').doc(id).get()
      const noteData = noteSnapshot.data()
      const formatNoteData = {
        ...noteData,
        note_id: id,
        note_created_time: noteData.note_created_time._seconds * 1000,
        note_updated_time: noteData.note_updated_time._seconds * 1000
      }

      return { ...formatNoteData }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

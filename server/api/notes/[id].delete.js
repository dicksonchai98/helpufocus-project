import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const { id: userId } = userData
    const id = getRouterParam(event, 'id')

    const db = initialFirestore()
    const noteSnapshot = await db.collection('notes').doc(id).get()
    if (!noteSnapshot.exists) throw createError(ResourceInvalidError404)

    const noteData = noteSnapshot.data()
    if (noteData.note_user_id !== userId) throw createError(ResourceInvalidError404)

    try {
      await db.collection('notes').doc(id).delete()

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

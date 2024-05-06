import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import errorHandler from '~/server/utils/errorHandler'
import { initialFirestore } from '~/server/utils/firebase/initial'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    if (!userData) throw createError(ResourceInvalidError404)

    try {
      const db = initialFirestore()
      const writeBatch = db.batch()
      const querySnapshot = await db.collection('refresh_token').where('id', '==', userData.id).get()
      querySnapshot.forEach((snapshot) => {
        const docRef = snapshot.ref
        writeBatch.delete(docRef)
      })
      await writeBatch.commit()

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

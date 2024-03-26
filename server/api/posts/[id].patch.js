import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { patchPostSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const { id: userId } = userData
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const validator = new Validator({ schema: patchPostSchema })
    const { post_likes: postLikes } = await validator.validate(body)

    const db = initialFirestore()
    const postDoc = await db.collection('posts').doc(id).get()
    if (!postDoc.exists) throw createError(ResourceInvalidError404)

    try {
      if (postLikes === 1) {
        await db.collection('posts').doc(id).collection(userId).doc(userId).set({ user_id: userId })
      } else if (postLikes === -1) {
        await db.collection('posts').doc(id).collection(userId).doc(userId).delete()
      }

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

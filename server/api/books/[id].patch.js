import {
  DatabaseOperationError500,
  InputDataError400,
  ResourceInvalidError404
} from '~/server/errors'
import Validator from '~/server/utils/validator'
import { patchBookSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const { id: userId } = userData
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const validator = new Validator({ schema: patchBookSchema })
    const { book_read_page: bookReadPage } = await validator.validate(body)

    const db = initialFirestore()
    const bookSnapshot = await db.collection('books').doc(id).get()
    if (!bookSnapshot.exists) throw createError(ResourceInvalidError404)

    const bookData = bookSnapshot.data()
    if (bookReadPage > bookData.book_total_page) throw createError(InputDataError400)
    if (bookData.book_user_id !== userId) throw createError(ResourceInvalidError404)

    try {
      await db.collection('books').doc(id).update({ book_read_page: bookReadPage })

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

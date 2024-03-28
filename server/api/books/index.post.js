import firebase from 'firebase-admin'
import { ref, uploadBytes } from 'firebase/storage'

import errorHandler from '../../utils/errorHandler'
import { addBookSchema } from '~/server/utils/validator/schema'
import { multipartParser } from '~/server/utils/parser'
import Validator from '~/server/utils/validator'
import { DatabaseOperationError500 } from '~/server/errors'
import { initialStorage } from '~/server/utils/firebase/initial'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const formData = await multipartParser(event)
    const validator = new Validator({ schema: addBookSchema })
    const {
      book_name: bookName,
      book_total_page: bookTotalPage,
    } = await validator.validate(formData)
    const { files } = event
    const file = files.pop()
    const bookData = {
      book_user_id: userData.id,
      book_name: bookName,
      book_total_page: Number(bookTotalPage),
      book_read_page: 0,
      book_created_time: firebase.firestore.FieldValue.serverTimestamp(),
      book_updated_time: firebase.firestore.FieldValue.serverTimestamp()
    }

    let result = null
    try {
      const db = initialFirestore()
      const bookRef = db.collection('books')
      result = await bookRef.add(bookData)
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }

    if (!result) throw createError(DatabaseOperationError500)

    try {
      const storage = initialStorage()
      const metadata = {
        contentType: 'image/jpeg'
      }
      const storageRef = ref(storage, `books/${userData.id}/${result.id}`)
      await uploadBytes(storageRef, file.data, metadata)
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }

    return { book_id: result.id }
  })
})

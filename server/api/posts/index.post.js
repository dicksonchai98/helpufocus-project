import firebase from 'firebase-admin'

import { DatabaseOperationError500 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { addPostSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const body = await readBody(event)
    const validator = new Validator({ schema: addPostSchema })
    const { post_title: postTitle, post_content: postContent } = await validator.validate(body)
    const postData = {
      post_user_id: userData.id,
      post_title: postTitle,
      post_content: postContent,
      post_created_time: firebase.firestore.FieldValue.serverTimestamp()
    }

    try {
      const db = initialFirestore()
      const postsRef = db.collection('posts')
      const result = await postsRef.add(postData)

      return { post_id: result.id }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

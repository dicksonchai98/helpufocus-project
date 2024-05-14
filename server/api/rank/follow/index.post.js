import firebase from 'firebase-admin'

import { DatabaseOperationError500 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { postFollowSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const { id: userId } = userData
    const body = await readBody(event)
    const validator = new Validator({ schema: postFollowSchema })
    const { follow_user_id: followUserId, follow_or_not: followOrNot } =
      await validator.validate(body)

    try {
      let updateOrNot = false
      const db = initialFirestore()
      const followsRef = await db.collection('follows').doc(userId).get()

      if (followsRef.exists) updateOrNot = true

      const docRef = db.collection('follows').doc(userId)
      const followFn = updateOrNot ? docRef.update : docRef.set
      if (Number(followOrNot) === 1) {
        await followFn.call(docRef, {
          follows: firebase.firestore.FieldValue.arrayUnion(followUserId)
        })
      } else if (Number(followOrNot) === 0) {
        await followFn.call(docRef, {
          follows: firebase.firestore.FieldValue.arrayRemove(followUserId)
        })
      }

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

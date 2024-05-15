import firebase from 'firebase-admin'

import { DatabaseOperationError500 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { postCollectionSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const { id: userId } = userData
    const body = await readBody(event)
    const validator = new Validator({ schema: postCollectionSchema })
    const { collection_post_id: collectionPostId, collection_or_not: collectionOrNot } =
      await validator.validate(body)

    try {
      let updateOrNot = false
      const db = initialFirestore()
      const collectionsRef = await db.collection('collections').doc(userId).get()
      if (collectionsRef.exists) updateOrNot = true

      const docRef = db.collection('collections').doc(userId)
      const collectionFn = updateOrNot ? docRef.update : docRef.set

      if (Number(collectionOrNot) === 1) {
        await collectionFn.call(docRef, {
          collections: firebase.firestore.FieldValue.arrayUnion(collectionPostId)
        })
      } else if (Number(collectionOrNot) === 0) {
        await collectionFn.call(docRef, {
          collections: firebase.firestore.FieldValue.arrayRemove(collectionPostId)
        })
      }

      return { result: true }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
})

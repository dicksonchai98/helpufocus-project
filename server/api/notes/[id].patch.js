import firebase from 'firebase-admin'

import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { patchNoteSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
    onRequest: [tokenAuthorization()],
    handler: errorHandler(async (event) => {
        const { userData } = event.context
        const { id: userId } = userData
        const id = getRouterParam(event, 'id')
        const body = await readBody(event)
        const validator = new Validator({ schema: patchNoteSchema })
        const { note_title: noteTitle, note_content: noteContent } = await validator.validate(body)

        const db = initialFirestore()
        const noteSnapshot = await db.collection('notes').doc(id).get()
        if (!noteSnapshot.exists) throw createError(ResourceInvalidError404)

        const noteData = noteSnapshot.data()
        if (noteData.note_user_id !== userId) throw createError(ResourceInvalidError404)


        try {
            await db.collection('notes').doc(id).update({
                note_title: noteTitle,
                note_content: noteContent,
                note_updated_time: firebase.firestore.FieldValue.serverTimestamp(),
            })

            return { result: true }
        } catch (error) {
            throw createError(DatabaseOperationError500)
        }
    })
})
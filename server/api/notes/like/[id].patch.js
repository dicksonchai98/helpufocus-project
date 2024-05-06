import { DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { likeNoteSchema } from '~/server/utils/validator/schema'

export default eventHandler({
    onRequest: [tokenAuthorization()],
    handler: errorHandler(async (event) => {
        const { userData } = event.context
        const { id: userId } = userData
        const id = getRouterParam(event, 'id')
        const body = await readBody(event)
        const validator = new Validator({ schema: likeNoteSchema })
        const { note_like: noteLike } = await validator.validate(body)

        const db = initialFirestore()
        const noteSnapshot = await db.collection('notes').doc(id).get()
        if (!noteSnapshot.exists) throw createError(ResourceInvalidError404)

        const noteData = noteSnapshot.data()
        if (noteData.note_user_id !== userId) throw createError(ResourceInvalidError404)

        try {
            await db.collection('notes').doc(id).update({
                note_like: noteLike
            })

            return { result: true }
        } catch (error) {
            throw createError(DatabaseOperationError500)
        }
    })
})
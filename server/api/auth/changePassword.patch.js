import { ConfirmPasswordError400, CurrentPasswordError400, DatabaseOperationError500, ResourceInvalidError404 } from '~/server/errors'
import Validator from '~/server/utils/validator'
import { changePasswordSchema } from '~/server/utils/validator/schema'

export default defineEventHandler({
  onRequest: [tokenAuthorization()],
  handler: errorHandler(async (event) => {
    const { userData } = event.context
    const body = await readBody(event)
    const validator = new Validator({ schema: changePasswordSchema })
    const {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword
    } = await validator.validate(body)

    if (newPassword !== confirmPassword) throw createError(ConfirmPasswordError400)

    const db = initialFirestore()
    const userSnapshot = await db.collection('users').doc(userData.id).get()
    if (!userSnapshot.exists) throw createError(ResourceInvalidError404)

    const data = userSnapshot.data()
    const { password: oldPassword } = data
    const comparedResult = await checkPassword(currentPassword, oldPassword)
    if (!comparedResult) throw createError(CurrentPasswordError400)

    const encryptPassword = await encryptPasswordWithSalt(newPassword)

    try {
        const userRef = db.collection('users').doc(userData.id)
        await userRef.update({ password: encryptPassword })

        return { result: true }
    } catch (error) {
        throw createError(DatabaseOperationError500)
    }
  })
})

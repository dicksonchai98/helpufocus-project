import { encryptPasswordWithSalt } from '../../utils/encrypt'
import { initialFirestore } from '../../utils/firebase/initial'
import { DatabaseDuplicateError409, DatabaseOperationError500 } from '../../errors'
import errorHandler from '../../utils/errorHandler'
import Validator from '../../utils/validator'
import { signUpSchema } from '../../utils/validator/schema'

export default errorHandler(
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    const validator = new Validator({ schema: signUpSchema })
    const { email, name, password } = await validator.validate(body)

    const encryptPassword = await encryptPasswordWithSalt(password)
    const data = { email, name, password: encryptPassword }

    const db = initialFirestore()
    const usersRef = db.collection('users')

    const existUser = await usersRef.select('email').where('email', '==', email).get()
    if (!existUser.empty) throw createError(DatabaseDuplicateError409)

    try {
      const result = await usersRef.add(data)

      return { id: result.id, name, email }
    } catch (error) {
      throw createError(DatabaseOperationError500)
    }
  })
)

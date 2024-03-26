import errorHandler from '../../utils/errorHandler'
import { refreshSchema } from '../../utils/validator/schema'
import { initialFirestore } from '../../utils/firebase/initial'
import Validator from '../../utils/validator'
import { ResourceInvalidError404, TokenInvalidError401 } from '../../errors'

export default errorHandler(
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    const validator = new Validator({ schema: refreshSchema })
    const { refresh_token: refreshToken } = await validator.validate(body)

    const db = initialFirestore()
    const { jti, userData } = verifyRefreshToken(refreshToken)
    const refreshTokenDoc = await db.collection('refresh_token').doc(jti).get()
    if (!refreshTokenDoc.exists) throw createError(TokenInvalidError401)

    const usersDoc = await db.collection('users').doc(userData.id).get()
    if (!usersDoc.exists) throw createError(ResourceInvalidError404)

    const payload = { userData }
    const { accessToken, exp } = generateAccessToken(payload)

    return {
      user_id: userData.id,
      username: userData.username,
      access_token: accessToken,
      expire_at: exp
    }
  })
)

import errorHandler from '../../utils/errorHandler'
import { loginSchema } from '../../utils/validator/schema'
import Validator from '../../utils/validator'
import { generateAccessToken, generateRefreshToken } from '../../utils/token'
import { LoginError401 } from '../../errors'
import { checkPassword } from '../../utils/encrypt'

export default errorHandler(
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    const validator = new Validator({ schema: loginSchema })
    const { username, password } = await validator.validate(body)

    const db = initialFirestore()
    const usersRef = db.collection('users')
    const querySnapshot = await usersRef
      .select('username', 'password')
      .where('username', '==', username)
      .limit(1)
      .get()
    if (querySnapshot.empty) throw createError(LoginError401)

    const [userDoc] = querySnapshot.docs
    const userData = userDoc.data()
    const { password: dbPassword } = userData
    const comparedResult = await checkPassword(password, dbPassword)
    if (!comparedResult) throw createError(LoginError401)

    const payload = { userData: { id: userDoc.id, username: userData.username } }
    const { accessToken, exp } = generateAccessToken(payload)
    const { refreshToken, jti } = generateRefreshToken(payload)

    const refreshTokenRef = db.collection('refresh_token').doc(jti)
    const data = { jti, id: userDoc.id }
    await refreshTokenRef.set(data)

    return {
      user_id: userDoc.id,
      username: userData.username,
      access_token: accessToken,
      refresh_token: refreshToken,
      expire_at: exp
    }
  })
)

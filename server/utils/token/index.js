import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { TokenInvalidError401 } from '~/server/errors'

export function generateAccessToken(payload) {
  const config = useRuntimeConfig()
  const { accessTokenSecret } = config
  const jti = uuidv4()
  const exp = Math.floor(Date.now() / 1000) + 60 * 60
  const accessToken = jwt.sign(
    {
      iss: 'HelpUFocus',
      jti,
      exp,
      ...payload
    },
    accessTokenSecret
  )

  return { accessToken, exp, jti }
}

export function generateRefreshToken(payload) {
  const config = useRuntimeConfig()
  const { refreshTokenSecret } = config
  const jti = uuidv4()
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
  const refreshToken = jwt.sign(
    {
      iss: 'HelpUFocus',
      jti,
      exp,
      ...payload
    },
    refreshTokenSecret
  )

  return { refreshToken, exp, jti }
}

export function verifyAccessToken(accessToken) {
  try {
    const config = useRuntimeConfig()
    const { accessTokenSecret } = config
    const verifiedAccessToken = jwt.verify(accessToken, accessTokenSecret)

    return { ...verifiedAccessToken }
  } catch (error) {
    throw createError(TokenInvalidError401)
  }
}

export function verifyRefreshToken(refreshToken) {
  try {
    const config = useRuntimeConfig()
    const { refreshTokenSecret } = config
    const verifiedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret)

    return { ...verifiedRefreshToken }
  } catch (error) {
    throw createError(TokenInvalidError401)
  }
}

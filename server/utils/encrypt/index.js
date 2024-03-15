import bcrypt from 'bcrypt'

export async function encryptPasswordWithSalt(password) {
  const saltRounds = 10
  const bcryptPassword = await bcrypt.hash(password, saltRounds)

  return bcryptPassword
}

export async function checkPassword(password, dbPassword) {
  const passwordCompareResult = await bcrypt.compare(password, dbPassword)

  return passwordCompareResult
}

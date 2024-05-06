import { CODE_CURRENT_PASSWORD_ERROR } from './errorCode'

export default {
  statusCode: 400,
  statusMessage: 'Current password is wrong.',
  data: {
    errorCode: CODE_CURRENT_PASSWORD_ERROR,
    errorMessage: 'Current password is wrong.'
  }
}

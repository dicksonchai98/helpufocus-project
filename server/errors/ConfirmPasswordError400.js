import { CODE_CONFIRM_PASSWORD_ERROR } from './errorCode';

export default {
  statusCode: 400,
  statusMessage: 'Password and confirm password are not the same.',
  data: {
    errorCode: CODE_CONFIRM_PASSWORD_ERROR,
    errorMessage: 'Password and confirm password are not the same.'
  }
}

import { CODE_LOGIN_ERROR } from './errorCode';

export default {
  statusCode: 401,
  statusMessage: 'Login error.',
  data: {
    errorCode: CODE_LOGIN_ERROR,
    errorMessage: 'Login error.'
  }
}

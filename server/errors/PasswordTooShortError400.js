import { CODE_PASSWORD_TOO_SHORT_ERROR } from './errorCode';

export default {
  statusCode: 400,
  statusMessage: 'Password too short.',
  data: {
    errorCode: CODE_PASSWORD_TOO_SHORT_ERROR,
    errorMessage: 'Password too short.'
  }
}

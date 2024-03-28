import { CODE_USERNAME_SPECIAL_CHAR_ERROR } from './errorCode';

export default {
  statusCode: 400,
  statusMessage: 'Username includes special characters.',
  data: {
    errorCode: CODE_USERNAME_SPECIAL_CHAR_ERROR,
    errorMessage: 'Username includes special characters.'
  }
}

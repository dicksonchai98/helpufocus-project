import { CODE_EMAIL_FORMAT_ERROR } from './errorCode';

export default {
  statusCode: 400,
  statusMessage: 'Email format error.',
  data: {
    errorCode: CODE_EMAIL_FORMAT_ERROR,
    errorMessage: 'Email format error.'
  }
}

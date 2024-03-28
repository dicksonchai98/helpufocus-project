import { CODE_DATABASE_OPERATION_ERROR } from './errorCode';

export default {
  statusCode: 500,
  statusMessage: 'Database operation error.',
  data: {
    errorCode: CODE_DATABASE_OPERATION_ERROR,
    errorMessage: 'Database operation error.'
  }
}

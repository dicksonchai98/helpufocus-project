import { CODE_DATABASE_DUPLICATE_ERROR } from './errorCode';

export default {
  statusCode: 409,
  statusMessage: 'Database has one or more duplicated row.',
  data: {
    errorCode: CODE_DATABASE_DUPLICATE_ERROR,
    errorMessage: 'Database has one or more duplicated row.'
  }
}

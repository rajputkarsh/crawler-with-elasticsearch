import { HTTP_STATUS_CODE } from '..';

export default {
  BAD_REQUEST: (data: string) => ({
    status: HTTP_STATUS_CODE.BAD_REQUEST,
    type: 'BAD_REQUEST',
    message: data,
  }),

  USER_NOT_AUTHORISED: {
    type: 'USER_NOT_AUTHORISED',
    status: HTTP_STATUS_CODE.UNAUTHORIZED,
    message: `You're not authorised to access this page`,
  },

  PAYLOAD_TOO_LARGE: {
    status: HTTP_STATUS_CODE.PAYLOAD_TOO_LARGE,
    type: 'PAYLOAD_TOO_LARGE',
    message: 'The payload has exceeded the maximum size limit',
  },

  SOMETHING_WENT_WRONG: {
    status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    type: 'SOMETHING_WENT_WRONG',
    message: 'Something went wrong',
  },

  INTERNAL_SERVER_ERROR: (data: string) => ({
    status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    type: 'INTERNAL_SERVER_ERROR',
    message: data,
  }),
};

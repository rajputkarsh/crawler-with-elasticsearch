import { HTTP_STATUS_CODE } from '..';

export default {
  URL_CRAWL_STARTED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'URL_CRAWL_STARTED',
    message: 'URL Crawling Started',
    data: data,
  }),
  CLIENTS_LIST: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'CLIENTS_LIST',
    message: 'Clients List Fetched',
    data: data,
  }),

  CLIENT_INFORMATION: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'CLIENT_INFORMATION',
    message: 'Client Information Fetched',
    data: data,
  }),

  CLIENT_SAVED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'CLIENT_SAVED',
    message: 'Client Information Saved',
    data: data,
  }),

  CLIENT_UPDATED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'CLIENT_UPDATED',
    message: 'Client Information Updated',
    data: data,
  }),

  CLIENT_DELETED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'CLIENT_DELETED',
    message: 'Client Information Deleted',
    data: data,
  }),
};

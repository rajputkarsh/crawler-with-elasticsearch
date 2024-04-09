import { HTTP_STATUS_CODE } from '..';

export default {
  URL_CRAWLED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'URL_CRAWLED',
    message: 'URL Crawled Successfully',
    data: data,
  }),
};

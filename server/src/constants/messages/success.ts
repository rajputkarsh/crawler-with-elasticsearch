import { HTTP_STATUS_CODE } from '..';

export default {
  URL_CRAWL_STARTED: (data: Object) => ({
    STATUS: HTTP_STATUS_CODE.OK,
    type: 'URL_CRAWL_STARTED',
    message: 'URL Crawling Started',
    data: data,
  }),
};

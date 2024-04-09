import elasticsearch, { Client } from '@elastic/elasticsearch';
import { IClient } from '../interfaces/model/client';

class ElasticSearch {
  #client: Client;

  constructor() {
    const client = new elasticsearch.Client({
      cloud: {
        id: process.env.ELASTIC_SEARCH_CLOUD_ID || '',
      },
      auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME || '',
        password: process.env.ELASTIC_SEARCH_PASSWORD || '',
      },
    });

    this.#client = client;
  }

  deleteClientIndex() {
    try {
      return this.#client.indices.delete({ index: 'client-data' });
    } catch(error) {
      throw error;
    }
  }

  saveClient(data: IClient) {
    try {
      return this.#client.index({
        index: 'client-data',
        body: data
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ElasticSearch();

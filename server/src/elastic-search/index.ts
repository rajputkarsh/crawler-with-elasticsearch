import elasticsearch, { Client } from '@elastic/elasticsearch';
import { IClient } from '../interfaces/model/client';

const CLIENT_INDEX_NAME = 'client-data';
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
      return this.#client.indices.delete({ index: CLIENT_INDEX_NAME });
    } catch (error) {
      throw error;
    }
  }

  saveClient(data: IClient) {
    try {
      return this.#client.index({
        index: CLIENT_INDEX_NAME,
        body: data,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateClient(id: string, data: IClient) {
    try {
      const response = await this.#client.search({
        index: CLIENT_INDEX_NAME,
        body: {
          query: {
            match: {
              uuid: id,
            },
          },
        },
      });

      const hits = response.hits.hits;

      if (!hits.length) return;

      return this.#client.update({
        index: CLIENT_INDEX_NAME,
        id: hits[0]._id,
        body: {
          doc: data,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(id: string) {
    try {
      const response = await this.#client.search({
        index: CLIENT_INDEX_NAME,
        body: {
          query: {
            match: {
              uuid: id,
            },
          },
        },
      });

      const hits = response.hits.hits;

      if (!hits.length) return;

      return this.#client.delete({
        index: CLIENT_INDEX_NAME,
        id: hits[0]._id,
      });
    } catch (error) {
      throw error;
    }
  }

  async searchClients(term: string, page: number = 1, limit: number = 25) {
    try {
      this.#client.indices.putSettings({
        index: CLIENT_INDEX_NAME,
        body: {
          analysis: {
            normalizer: {
              lowerCaseNormalizer: {
                type: 'custom',
                filter: ['lowercase'],
              },
            },
          },
        },
      });

      const response = await this.#client.search({
        index: CLIENT_INDEX_NAME,
        body: {
          query: {
            multi_match: {
              query: term,
              fields: [
                'uuid.lowerCaseNormalizer',
                'name.lowerCaseNormalizer',
                'cin.lowerCaseNormalizer',
                'email.lowerCaseNormalizer',
              ],
              operator: 'or',
              type: 'phrase_prefix',
            },
          },
        },
      });

      const results = response.hits.hits;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return results.slice(startIndex, endIndex);
    } catch (error) {
      throw error;
    }
  }
}

export default new ElasticSearch();

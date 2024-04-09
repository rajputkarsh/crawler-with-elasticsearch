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
    } catch(error) {
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

  async searchClients(term: string) {
    try {
      this.#client.indices.putSettings({
        index: CLIENT_INDEX_NAME,
        body: {
          analysis: {
            normalizer: {
              lowerCaseNormalizer: {
                type: 'custom',
                filter: ['lowercase']
              }
            }
          }
        }
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
      return results
    }  catch(error) {
      throw error;
    }   
  }
}

export default new ElasticSearch();

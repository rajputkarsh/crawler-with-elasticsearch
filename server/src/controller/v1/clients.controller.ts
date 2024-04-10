import {clientsDao} from "../../dao";
import elasticSearch from "../../elastic-search";
import { IClient } from "../../interfaces/model/client";
import { generateUUID } from "../../utils";

class ClientsController {
  list(page: number, limit: number) {
    try {
      return clientsDao.list(page, limit);
    } catch (error) {
      throw error;
    }
  }

  search(q: string, page: number, limit: number) {
    try {
      return elasticSearch.searchClients(q, page, limit);
    } catch (error) {
      throw error;
    }
  }

  findByUUID(uuid: string) {
    try {
      return clientsDao.findOne(uuid);
    } catch (error) {
      throw error;
    }
  }

  async save(data: Exclude<IClient, 'uuid'>) {
    try {
      const uuid = generateUUID();
      await elasticSearch.saveClient({ ...data, uuid });
      return clientsDao.save({ ...data, uuid });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Exclude<IClient, 'uuid'>) {
    try {
      const { uuid, ...updateData } = data;
      await elasticSearch.updateClient(id, { ...data, uuid: id });
      return clientsDao.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async delete(uuid: string) {
    try {
      await elasticSearch.deleteClient(uuid);
      return clientsDao.delete(uuid);
    } catch (error) {
      throw error;
    }
  }
}

export default new ClientsController();
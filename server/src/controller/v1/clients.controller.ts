import {clientsDao} from "../../dao";
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

  findByUUID(uuid: string) {
    try {
      return clientsDao.findOne(uuid);
    } catch (error) {
      throw error;
    }
  }

  save(data: Exclude<IClient, 'uuid'>) {
    try {
      const uuid = generateUUID();
      return clientsDao.save({ ...data, uuid });
    } catch (error) {
      throw error;
    }
  }

  update(id: string, data: Partial<IClient>) {
    try {
      const { uuid, ...updateData } = data;
      return clientsDao.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  delete(uuid: string) {
    try {
      return clientsDao.delete(uuid);
    } catch (error) {
      throw error;
    }
  };
}

export default new ClientsController();
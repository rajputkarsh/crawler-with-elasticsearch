
import prisma from "../../utils/database";
import { IClient } from "../../interfaces/model/client";

class ClientsDao {
  save(data: IClient) {
    return prisma.clients.create({ data });
  }
}

export default new ClientsDao();
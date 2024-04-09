import prisma from '../../utils/database';
import { IClient } from '../../interfaces/model/client';

class ClientsDao {
  list(page: number = 1, limit: 10) {
    return prisma.clients.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(uuid: string) {
    return prisma.clients.findFirst({ where: { uuid } });
  }

  save(data: IClient) {
    return prisma.clients.create({ data });
  }

  update(uuid: string, data: Partial<IClient>) {
    return prisma.clients.update({
      where: { uuid },
      data: data,
    });
  }

  delete(uuid: string) {
    return prisma.clients.delete({ where: { uuid } });
  }

  deleteTable(): Promise<unknown> {
    return prisma.$executeRaw`DROP TABLE clients`;
  }
}

export default new ClientsDao();

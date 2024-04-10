import prisma from '../../utils/database';
import { IClient } from '../../interfaces/model/client';

class ClientsDao {
  async list(page: number = 1, limit: number = 25) {
    try {
    const count = await prisma.clients.count();
    const result = await prisma.clients.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { count, result };
    } catch(error) {
      throw error;
    }
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

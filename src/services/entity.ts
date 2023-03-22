import { entityRepo } from "@app/data/entity/entity.repo";

class Entity {
  async getAllEntities(accountId: string, limit: number) {
    return await entityRepo.entries.findMany({
      where: { accountId },
      take: limit,
      orderBy: {
        id: "asc",
      },
    });
  }
}

export const entity = new Entity();

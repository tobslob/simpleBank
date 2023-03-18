import { entityRepo } from "@app/data/entity/entity.repo";

class Entity {
  async getAllEntities(accountId: string) {
    return await entityRepo.entries.findMany({ where: { accountId } });
  }
}

export const entity = new Entity();

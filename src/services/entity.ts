import { entityRepo } from "@app/data/entity/entity.repo";
import { Request } from "express";

class Entity {
  async getAllEntities(accountId: string, limit: number, req: Request) {
    return await entityRepo.entries.findMany({
      where: { accountId, userId: req.user.id },
      take: limit,
      orderBy: {
        id: "asc",
      },
    });
  }
}

export const entity = new Entity();

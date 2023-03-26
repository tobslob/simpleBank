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

  async amountSpent(accountId: string, userId: string) {
    const transactions = await entityRepo.entries.findMany({
      where: { accountId, tranferType: "DEBIT", userId },
    });

    let sum = 0;
    for (const txn of transactions) {
      sum = sum + txn.amount;
    }

    return sum;
  }
}

export const entity = new Entity();

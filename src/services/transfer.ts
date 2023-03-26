import { TransferDTO } from "@app/data/transfer/transfer.model";
import { transferRepo } from "@app/data/transfer/transfer.repo";
import { TransferType } from "@prisma/client";
import { Request } from "express";

class Transfers {
  async createTransfer(transfer: TransferDTO, req: Request) {
    let acct;
    const { account, id, firstName } = req.user;
    await transferRepo.$transaction(async (transaction) => {
      const getAcct = await transaction.accounts.findFirst({
        where: { accountNumber: account[0].accountNumber },
      });

      if (getAcct?.balance <= 0 || getAcct?.balance < transfer.amount) {
        throw new Error("Your balance is low");
      }

      acct = await transaction.accounts.update({
        where: { accountNumber: account[0].accountNumber },
        data: { balance: { decrement: transfer.amount } },
      });

      await transaction.entries.create({
        data: {
          amount: transfer.amount,
          tranferType: TransferType.DEBIT,
          accountId: account[0].id,
          userId: id,
          currency: acct?.currency,
          description: transfer.description,
        },
      });

      const receiverAcct = await transaction.accounts.update({
        where: { accountNumber: transfer.toAccountId },
        data: { balance: { increment: transfer.amount } },
      });

      await transaction.entries.create({
        data: {
          amount: transfer.amount,
          tranferType: TransferType.CREDIT,
          accountId: receiverAcct.id,
          currency: acct?.currency,
          userId: id,
          description: `account credited by ${firstName}`,
        },
      });
    });
    return acct;
  }
}

export const transfers = new Transfers();

import { TransferDTO } from "@app/data/transfer/transfer.model";
import { transferRepo } from "@app/data/transfer/transfer.repo";
import { ForbiddenError } from "@app/data/util";
import { TransferType } from "@prisma/client";
import { Request } from "express";
import { accounts } from "./account";

class Transfers {
  async createTransfer(transfer: TransferDTO, req: Request) {
    let acct;
    const { account, id, firstName } = req.user;

    if (account?.[0]?.accountNumber === transfer.toAccountId) {
      throw new ForbiddenError(
        "you can't initiate self transaction to same account"
      );
    }

    const receiverAccount = await accounts.getAccount(transfer.toAccountId);

    if (account?.[0]?.currency !== receiverAccount.currency) {
      throw new ForbiddenError(
        "transfer to different currency are not currently supported"
      );
    }

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
          userId: receiverAcct.userId,
          description: `${transfer.description}/credit by ${firstName}`,
        },
      });
    });
    return acct;
  }
}

export const transfers = new Transfers();

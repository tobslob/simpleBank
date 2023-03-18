import { AccountDTO, BalanceDTO } from "@app/data/account/account.model";
import { accountRepo } from "@app/data/account/account.repo";
import { accountNumberGenerator } from "@app/data/util";
import { Request } from "express";

class Accounts {
  async getAccount(account: string) {
    return await accountRepo.accounts.findUnique({
      where: { accountNumber: account },
    });
  }

  async updateAccount(balance: BalanceDTO, req: Request) {
    const [{ accountNumber }] = req.user.account;
    return await accountRepo.accounts.update({
      where: { accountNumber },
      data: {
        balance: balance.balance,
      },
    });
  }

  async createAccount(account: AccountDTO, req: Request) {
    return await accountRepo.accounts.create({
      data: {
        accountNumber: String(accountNumberGenerator(10000000, 99999999)),
        currency: account.currency,
        sortCode: accountNumberGenerator(100000, 999999),
        balance: 0,
        userId: req.user.id,
      },
    });
  }
}

export const accounts = new Accounts();

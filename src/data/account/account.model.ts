import { BaseModel } from "../base/base.model";

export interface Account extends BaseModel {
  accountNumber: string;
  userId: string;
  balance: number;
  currency: string;
}

export interface AccountDTO {
  currency: Currency;
}

export interface BalanceDTO {
  balance: number;
}

export enum Currency {
  GBP = "GBP",
  USD = "USD",
}

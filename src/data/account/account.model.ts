import { BaseModel } from "../base/base.model";

export interface Account extends BaseModel {
  accountNumber: string;
  userId: string;
  balance: number;
  currency: "GBP" | "USD";
}

export interface AccountDTO {
  currency: "GBP" | "USD";
}

export interface BalanceDTO {
  balance: number;
}

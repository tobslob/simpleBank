import { BaseModel } from "../base/base.model";

export interface Entity extends BaseModel {
  accountId: string;
  userId: string;
  amount: number;
  tranferType: "CREDIT" | "DEBIT";
  currency: "GBP" | "USD";
  description?: string;
  createdAt: Date;
}

export interface EntityDTO {
  accountId: string;
  limit: number;
}

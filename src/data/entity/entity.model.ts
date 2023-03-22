import { BaseModel } from "../base/base.model";

export interface Entity extends BaseModel {
  accountId: string;
  amount: number;
  tranferType: "CREDIT" | "DEBIT";
  description?: string;
  createdAt: Date;
}

export interface EntityDTO {
  accountId: string;
  limit: number;
}

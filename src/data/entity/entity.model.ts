import { BaseModel } from "../base/base.model";

export interface Entity extends BaseModel {
  accountId: string;
  amount: number;
  tranferType: "CREDIT" | "DEBIT";
}

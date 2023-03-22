import { BaseModel } from "../base/base.model";

export interface Transfer extends BaseModel {
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  userId: string;
}

export interface TransferDTO {
  toAccountId: string;
  amount: number;
  description: string;
}

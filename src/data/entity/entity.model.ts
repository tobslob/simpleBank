export interface Entity {
  id: string;
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

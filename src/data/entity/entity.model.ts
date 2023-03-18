export interface Entity {
  id: string;
  accountId: string;
  amount: number;
  tranferType: "CREDIT" | "DEBIT";
  createdAt: Date;
}

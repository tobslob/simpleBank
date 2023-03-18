export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  createdAt: string;
  userId: string;
}

export interface TransferDTO {
  toAccountId: string;
  amount: number;
}

export interface Account {
  id: string;
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

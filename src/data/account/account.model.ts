export interface Account {
  accountNumber: string
  userId: string
  balance: number
  currency: string
}

export interface AccountDTO {
  accountNumber: string
  userId: string
  balance: number
  currency: string
}

export enum Currency {
  GBP = "gbp",
  USD = "usd"
}
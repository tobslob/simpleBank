import { Account } from "../account/account.model";
import { BaseModel } from "../base/base.model";

export interface User extends BaseModel{
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  currency: "GBP" | "USD";
}

export interface LoginDTO {
  emailAddress: string;
  password: string;
}

export interface Auth extends User {
  token: string;
  account: Account[]
}

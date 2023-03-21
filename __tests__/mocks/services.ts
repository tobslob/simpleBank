import { Users } from "../../src/services/user";
import { accounts } from "../../src/services/account";
import faker from "faker";
import { Currency } from "../../src/data/account/account.model";
import { Request } from "express";

export const createUser = async (password: string) => {
  return await Users.createUser({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: password,
    currency: Currency.USD,
  });
};

export const createAccount = async (req: Request) => {
  return await accounts.createAccount({ currency: Currency.GBP }, req);
};

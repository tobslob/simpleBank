import { UserDTO, User, LoginDTO } from "@app/data/user";
import { Passwords } from "./password";
import { accountNumberGenerator, UnAuthorisedError } from "@app/data/util";
import { seal } from "@app/common/services/jsonwebtoken";
import { config } from "dotenv";
import { UserRepo } from "@app/data/user/user.repo";

config();

class UserService {
  constructor() {}

  async createUser(user: UserDTO): Promise<User> {
    const password = await Passwords.generateHash(user.password);
    let createdUser
    await UserRepo.$transaction(async (transaction) => {
      delete user.currency;
      createdUser = await transaction.users.create({
        data: { ...user, password },
      });
      await transaction.accounts.create({
        data: {
          accountNumber: String(accountNumberGenerator( 10000000, 99999999)),
          balance: 0,
          currency: user.currency ?? "gbp",
          userId: createdUser.id,
          sortCode: accountNumberGenerator(100000, 999999)
        },
      });
    });

    return createdUser;
  }

  async getUser(id: string): Promise<User> {
    return await UserRepo.users.findUnique({ where: { id } });
  }

  async login(login: LoginDTO): Promise<string> {
    const user = await UserRepo.users.findUniqueOrThrow({
      where: { emailAddress: login.emailAddress },
    });

    const isCorrectPassword = await Passwords.validate(
      login.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new UnAuthorisedError("Incorrect email address or password.");
    }

    return seal(user, process.env.SECRET_KEY, "2h");
  }
}

export const Users = new UserService();

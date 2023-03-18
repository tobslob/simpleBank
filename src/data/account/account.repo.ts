import { BaseRepository } from "@app/data/base/base.repo";

class Accounts extends BaseRepository {
  super() {}
}

export const accountRepo = new Accounts();

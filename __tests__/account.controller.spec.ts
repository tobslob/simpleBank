import "module-alias/register";
import "reflect-metadata";
import sinon from "sinon";
import supertest, { SuperTest, Test } from "supertest";
import { App } from "../src/server/app";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./mocks/services";
import { Currency } from "../src/data/account/account.model";
import { createSession, createJsonWebToken } from "./helpers";

let app: App;
let request: SuperTest<Test>;
const baseUrl = "/api/v1/accounts";

beforeAll(async () => {
  app = new App();

  const server = app.getServer().build();
  request = supertest(server);
});

afterAll(async () => {
  await app.closeDB();
});

afterEach(async () => {
  sinon.resetHistory();
  sinon.resetBehavior();
});

describe("Accounts", () => {
  it("Successfully create account", async () => {
    const user = await createUser("test1234");
    const session = createSession(user.id);
    const token = await createJsonWebToken(session);
    await request
      .post(baseUrl)
      .set("Authorization", token)
      .send({
        Currency: Currency.GBP,
      })
      .expect(StatusCodes.OK);
  });
});

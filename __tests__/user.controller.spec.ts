import "module-alias/register";
import "reflect-metadata";
import sinon from "sinon";
import supertest, { SuperTest, Test } from "supertest";
import { App } from "../src/server/app";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./mocks/services";
import { Currency } from "../src/data/account/account.model";
import faker from "faker";
import { PrismaClient } from "@prisma/client";

let app: App;
let request: SuperTest<Test>;

const baseUrl = "/api/v1/users";

beforeAll(async () => {
  app = new App();

  const server = app.getServer().build();
  request = supertest(server);
});

afterAll(async () => {
  new PrismaClient().$disconnect();
  await app.closeDB();
});

afterEach(async () => {
  sinon.resetHistory();
  sinon.resetBehavior();
});

describe("User", () => {
  it("Successfully create user", async () => {
    const { body } = await request
      .post(baseUrl)
      .send({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        emailAddress: faker.internet.email(),
        password: faker.internet.password(),
        currency: Currency.USD,
      })
      .expect(StatusCodes.OK);
    expect(body.data).toHaveProperty("firstName");
    expect(body.data).toHaveProperty("token");
  });

  it("Successfully logged user in", async () => {
    const user = await createUser("test1234");

    await request
      .post(`${baseUrl}/login`)
      .send({
        emailAddress: user.emailAddress,
        password: "test1234",
      })
      .expect(StatusCodes.OK);
  });
});

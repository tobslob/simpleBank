import {
  controller,
  httpPost,
  request,
  response,
  requestBody,
  httpGet,
  requestParam,
  httpPatch,
} from "inversify-express-utils";
import { BaseController, validate } from "@app/data/util";
import { Request, Response } from "express";
import {
  Account,
  AccountDTO,
  BalanceDTO,
} from "@app/data/account/account.model";
import { isAccount, isAccountNumber, isBalance } from "./account.validator";
import { accounts } from "@app/services/account";
import { secure } from "@app/common/services/jsonwebtoken";

type controllerResponse = Account | Account[];

@controller("/accounts", secure)
export class AccountController extends BaseController<controllerResponse> {
  @httpPost("/", validate(isAccount))
  async createAccount(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: AccountDTO
  ) {
    try {
      const account = await accounts.createAccount(body, req);
      this.handleSuccess(req, res, account);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }

  @httpGet("/:account", validate(isAccountNumber))
  async getAccount(
    @request() req: Request,
    @response() res: Response,
    @requestParam("account") account: string
  ) {
    try {
      const acct = await accounts.getAccount(account);
      this.handleSuccess(req, res, acct);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }

  @httpPatch("/", validate(isBalance))
  async updateAccount(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: BalanceDTO
  ) {
    try {
      const acct = await accounts.updateAccount(body, req);
      this.handleSuccess(req, res, acct);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }
}

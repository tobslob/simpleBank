import {
  controller,
  httpPost,
  request,
  response,
  requestBody,
} from "inversify-express-utils";
import { BaseController, validate } from "@app/data/util";
import { Request, Response } from "express";
import { Transfer, TransferDTO } from "@app/data/transfer/transfer.model";
import { isTransfer } from "./transfer.validator";
import { transfers } from "@app/services/transfer";
import { secure } from "@app/common/services/jsonwebtoken";

type controllerResponse = Transfer | Transfer[];

@controller("/transfers", secure)
export class TransferController extends BaseController<controllerResponse> {
  @httpPost("/", validate(isTransfer))
  async createTransfer(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: TransferDTO
  ) {
    try {
      const transfer = await transfers.createTransfer(body, req);
      this.handleSuccess(req, res, transfer);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }
}

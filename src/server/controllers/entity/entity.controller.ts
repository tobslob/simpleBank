import {
  controller,
  request,
  response,
  httpGet,
  queryParam,
} from "inversify-express-utils";
import { BaseController, validate } from "@app/data/util";
import { Request, Response } from "express";
import { isAccountNumber } from "../account/account.validator";
import { Entity, EntityDTO } from "@app/data/entity/entity.model";
import { entity } from "@app/services/entity";
import { secure } from "@app/common/services/jsonwebtoken";

@controller("/entities", secure)
export class EntityController extends BaseController<Entity[]> {
  @httpGet("/", validate(isAccountNumber))
  async getAllEntities(
    @request() req: Request,
    @response() res: Response,
    @queryParam() query: EntityDTO
  ) {
    try {
      const entities = await entity.getAllEntities(
        query.accountId,
        Number(query?.limit ?? 10),
        req
      );
      this.handleSuccess(req, res, entities);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }
}

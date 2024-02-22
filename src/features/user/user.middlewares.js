import { AsyncUtils } from "../../shared/utilities/index.js";

import { ErrorExceptions } from "../../core/error/index.js";

import UserService from "./user.service.js";


export default class UserMiddlewares {
  static createMountUserFromToken = () =>
    AsyncUtils.asyncHandler(async (req, res, next) => {
      const userDoc = await UserService.getUserById(req.user.id);
      if (!userDoc) {
        throw ErrorExceptions.UNAUTHORIZED();
      }

      req.locals.user = userDoc;

      next();
    });

}

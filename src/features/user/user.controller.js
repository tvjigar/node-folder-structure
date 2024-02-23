import httpStatus from "http-status";
import { AsyncUtils } from "../../shared/utilities/index.js";
import UserService from "./user.service.js";
import { Exceptions } from "../../core/exceptions/index.js";

/**
 * User Controller
 */
export default class UserController {
  /**
   * Method: GET
   *
   * Path: /api/user/
   */
  static getUsers = AsyncUtils.asyncHandler(async (req, res) => {
    const userDocs = await UserService.getUsers();
    res.send({
      success:true,
      data: userDocs,
    });
  });


  /**
   * Method: GET
   *
   * Path: /api/user/:userId
   *
   * @throws {ApiError} - USER_NOT_FOUND
   */
  static getUser = AsyncUtils.asyncHandler(async (req, res) => {
    const userDoc = await UserService.getUserById(req.params.userId);

    if (!userDoc) {
      throw Exceptions.USER_NOT_FOUND();
    }
    res.send({
      success:true,
      data: userDoc,
    });
  });

  /**
   * Method: PATCH
   *
   * Path: /api/user/:userId
   */
  static updateUser = AsyncUtils.asyncHandler(async (req, res) => {
    const userDoc = await UserService.updateUserById(
      req.params.userId,
      req.body
    );
    res.send({
      success:true,
      user: userDoc,
    });
  });

  /**
   * Method: DELETE
   *
   * Path: /api/user/:userId
   */
  static deleteUser = AsyncUtils.asyncHandler(async (req, res) => {
    await UserService.deleteUserById(req.params.userId);

    res.status(httpStatus.NO_CONTENT).send({ success:true});
  });
}

import httpStatus from "http-status";
import { AsyncUtils } from "../../shared/utilities/index.js";
import { TokenService } from "../../core/token/index.js";
import { UserService } from "../../features/user/index.js";
import { Exceptions } from "../../core/exceptions/index.js";

/**
 * Authentication Controller
 */
export default class AuthController {
  /**
   * Method: POST
   *
   * Path: /api/auth/register
   */
  static register = AsyncUtils.asyncHandler(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const userDoc = await UserService.createUser(data);

    const authToken = await TokenService.generateAuthToken(userDoc);
    const refreshToken = await TokenService.generateRefreshToken(userDoc);

    res.status(httpStatus.CREATED).send({
      success: true,
      user: userDoc.toPlainObject(),
      tokens: {
        auth: authToken,
        refresh: refreshToken,
      },
    });
  });

  /**
   * Method: POST
   *
   * Path: /api/auth/login
   */
  static login = AsyncUtils.asyncHandler(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const userDoc = await UserService.getUserByEmail(data.email);

    if (!userDoc) {
      throw Exceptions.EMAIL_PASSWORD_WRONG(res);
    }

    const isPasswordMatch = await userDoc.isPasswordMatch(data.password);

    if (!isPasswordMatch) {
      throw Exceptions.EMAIL_PASSWORD_WRONG(res);
    }

    await TokenService.cleanupRefreshTokens(userDoc.id);

    const authToken = await TokenService.generateAuthToken(userDoc);
    const refreshToken = await TokenService.generateRefreshToken(userDoc);

    res.send({
      success:true,
      user: userDoc.toPlainObject(),
      tokens: {
        auth: authToken,
        refresh: refreshToken,
      },
    });
  });

  /**
   * Method: POST
   *
   * Path: /api/auth/logout
   */
  static logout = AsyncUtils.asyncHandler(async (req, res) => {
    const data = {
      token: req.body.token,
    };

    const refreshTokenDoc = await TokenService.verifyRefreshToken(data.token);

    await TokenService.cleanupRefreshTokens(refreshTokenDoc.user);

    res.status(httpStatus.NO_CONTENT).send({success:true});
  });
}

import { SHA512 } from "../utils/ServerUtils.js";
import AuthToken from "../classesDTO/AuthToken.js";
import User from "../models/UserModel.js";
import config from "../utils/Config.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

const TOKENS = [];

async function GetUserPassMiddleware(req, res, next) {
  // get the user_id and password from the header
  const user_id = req.headers.user_id;
  const rfid = req.headers.rfid;
  const password = req.headers.password;
  const api_key = req.headers.api_key;

  // return bad-request if these fields are missing
  if (!user_id) {
    if (!rfid)
      return res.status(400).json({
        message: "User_ID must be present at the header of the request!",
        StatusCode: 400,
      });
    else if (rfid === "")
      return res.status(400).json({
        message: "RFID must be present at the header of the request!",
        StatusCode: 400,
      });
  }
  if (!password) {
    if (!api_key)
      return res.status(400).json({
        message: "Password must be present at the header of the request!",
        StatusCode: 400,
      });
  }

  // database lookup
  try {
    let args = user_id ? "user_id" : "rfid";
    const credentials = {
      [args]: user_id ? user_id : rfid,
    };

    if (password) credentials.password = await SHA512(password);

    if (api_key && !password)
      if (!config.getAPI_KEYS().includes(api_key))
        return res.status(401).json({
          message: "You have provided an invalid api_key, Unauthozired!",
          StatusCode: 401,
        });

    const user = await User.findOne(credentials);

    // return unauthorized when user is not found
    if (!user)
      return res.status(401).json({ message: "Unauthorized", StatusCode: 401 });
    res.issuer = user.user_id;
  } catch (error) {
    // return server-error when error occurs
    return res.status(500).json({
      message: "Internal server error! " + error.message,
      StatusCode: 500,
    });
  }

  // proceed to the next middleware [if there is any]
  next();
}

function GenerateToken(req, res, next) {
  // generate a new token
  const token = new AuthToken(res.issuer);

  // remove old token associated with the issuer
  const filtered = TOKENS.filter((t) => t.issuer !== token.issuer);
  for (let i = 0; i < TOKENS.length; i++) TOKENS.pop();

  // update the array
  TOKENS.push(...filtered, token);

  res.AuthToken = token;
  next();
}

function ValidateAPIKey(req, res, next) {
  const api_key = req.headers.api_key;

  if (!api_key)
    return res.status(403).json({
      message:
        "You are forbidden to proceed to your request without an api_key",
      StatusCode: 403,
    });

  if (!config.getAPI_KEYS().includes(api_key))
    return res.status(401).json({
      message: "You have provided an invalid api_key, Unauthozired!",
      StatusCode: 401,
    });

  next();
}

/**
 * This middleware function will check for the `AuthToken` at the
 * {@link Request} header. This function will run asynchronously since it
 * will do some database lookup.
 *
 * If AuthToken was not provided in the request header, this function will
 * return a `400 - bad request` response. If an AuthToken does not exists,
 * this function will return a `403 - Forbidden` response, otherwise, it will
 * bind the `AuthExpired`, `ExpireTime`, `issuer`, and `isAdmin` in the
 * {@link Response} object.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 * @returns {Response} the response
 *
 * @example
 * expressRoute.get('/', GetAuthToken, (req, res) => {});
 */
async function GetAuthToken(req, res, next) {
  // get the header
  const authToken = req.headers.authtoken;

  // if no token is in header, return bad-request
  if (!authToken)
    return res.status(400).json({
      message: "AuthToken must be provided at the request header!",
      StatusCode: 400,
    });

  const foundToken = TOKENS.filter((token) => token.AuthToken === authToken);

  // if no token was found, return a forbidden response
  if (foundToken.length === 0)
    return res.status(403).json({
      message: "AuthToken provided does not exists!",
      StatusCode: 403,
    });

  // grab the token info and check if expired
  const dateNow = new Date();
  res.AuthExpired = new Date(foundToken[0].ExpirationDate) < dateNow.getTime();
  res.ExpireTime =
    new Date(foundToken[0].ExpirationDate).getTime() - dateNow.getTime();

  // get the issuer id
  res.issuer = foundToken[0].issuer;
  const user = await User.findOne({ user_id: res.issuer });
  //  get the user admin status
  res.isAdmin = user.isAdmin;
  res.issuerObjectId = user._id;

  next();
}

function VerifyAdmin(req, res, next) {
  if (!res.isAdmin)
    return res.status(403).json({
      message: "AuthToken is not authorized to access administrator privilege",
      StatusCode: 403,
    });

  next();
}

//Kean code for api route v2 middleware
export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const { user_id, isAdmin } = verifyJWT(token);
    req.user = { user_id, isAdmin };
    console.log(payload);

    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("Authentication Invalid!");
  }
};

export {
  GetUserPassMiddleware,
  GenerateToken,
  GetAuthToken,
  VerifyAdmin,
  ValidateAPIKey,
};

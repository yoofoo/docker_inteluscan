import UserGroup from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Create user group
export const CreateUserGroup = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    if (!authToken)
      return h.response({
        Message: "No token provided.",
        status: 401
      });
    //Bearer Token spliting
    const validateToken = await VerifyToken(authToken.split(" ")[1]);
    if (
      validateToken.name === "JsonWebTokenError" ||
      validateToken.name === "TokenExpiredError"
    ) {
      return h.response({ Message: validateToken.message });
    } else {
      const chkUserGroupExist = await UserGroup.find({
        group_name: request.payload.group_name
      });
      // console.log("User Exists", chkUserGroupExist.length);
      if (chkUserGroupExist.length >= 1)
        return h.response({
          Message: request.payload.group_name + " already exists in system"
        });
      else {
        const reqPayload = new UserGroup(request.payload);
        const savePayload = await reqPayload.save();
        //   console.log("CreateUserGroup");
        return h.response({
          Message: savePayload.group_name + " created successfully ",
          status: 200
        });
      }
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Add group users
export const AddGroupUsers = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    if (!authToken)
      return h.response({
        Message: "No token provided.",
        status: 401
      });
    //Bearer Token spliting
    const validateToken = await VerifyToken(authToken.split(" ")[1]);
    if (
      validateToken.name === "JsonWebTokenError" ||
      validateToken.name === "TokenExpiredError"
    ) {
      return h.response({ Message: validateToken.message });
    } else {
      const usrGrpId = request.params.group_id;
      const addUsrs = await UserGroup.update(
        { _id: usrGrpId },
        { $push: { group_users: request.payload } }
      );
      return h.response(addUsrs);
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Verify JSON Token
const VerifyToken = async tokn => {
  try {
    var decodedToken = jwt.verify(tokn, process.env.secret);
    return decodedToken;
  } catch (err) {
    return { name: err.name, message: err.message };
  }
};

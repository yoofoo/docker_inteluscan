import UserGroup from "./model";

//Create user group
export const CreateUserGroup = async (request, h) => {
  try {
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
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Add group users
export const AddGroupUsers = async (request, h) => {
    try {
        const usrGrpId = request.params.group_id;
        const addUsrs = await UserGroup.update({"_id": usrGrpId}, { $push: { group_users: request.payload } });
        return h.response(addUsrs);
    } catch (error) {
        return h.response(error).code(500);
    }
}

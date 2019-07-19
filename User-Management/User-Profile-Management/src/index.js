import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { AddNewProfile, ListOfUsers, UserPersonalInfoById } from "../src/users/index";
// import { CreateUsers, AllUsers, UpdateUsersById, DeleteUsersById, ValidateUsers, ForgetPassword, ValidateUserExists, ChangePassword } from '../src/users/index';

//mongodb://surendraraj3:a123456789@ds161764.mlab.com:61764/inteluscan
//mongodb://surendraraj3:a123456789@ds111993.mlab.com:11993/yoofoo-web
mongoose
  .connect("mongodb://mongo:27017/dockin", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 7002,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//-----------------------------Profile Starts-------------------
//Create a new profile
server.route({
  method: "POST",
  path: "/user-profile/create-new-profile",
  handler: AddNewProfile
});

//List of users
server.route({
  method: "GET",
  path: "/user-profile/list-users",
  handler: ListOfUsers
});

//User info based on user id
server.route({
  method: 'GET',
  path:"/user-profile/user-profile-by-id/{user_profile_id}",
  handler: UserPersonalInfoById
})

//-----------------------------Profile Ends---------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

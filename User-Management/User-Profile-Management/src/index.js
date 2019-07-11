import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { CreateUsers, AllUsers, UpdateUsersById, DeleteUsersById, ValidateUsers, ForgetPassword, ValidateUserExists, ChangePassword } from '../src/users/index';

//mongodb://surendraraj3:a123456789@ds161764.mlab.com:61764/inteluscan
//mongodb://surendraraj3:a123456789@ds111993.mlab.com:11993/yoofoo-web
mongoose
  .connect("mongodb://localhost:27017/inteluscan_db", { useNewUrlParser: true } )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 7002,
  host: process.env.IP || '0.0.0.0',
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//Create user
server.route({
  method: 'POST',
  path:'/user/create-user',
  handler:CreateUsers
})
//Fetch all users list
server.route({
  method: 'GET',
  path: '/all-users',
  handler:AllUsers
})
//Forget password
server.route({
  method:'GET',
  path: '/user/forget-password/{email}',
  handler:ForgetPassword
})
//Update user details
server.route({
  method: 'PUT',
  path:'/update-users/{id}',
  handler: UpdateUsersById
})

//Delete users by id
server.route({
  method: 'DELETE',
  path:'/delete-users/{id}',
  handler: DeleteUsersById
})
//login validation
server.route({
  method:'POST',
  path:'/validate-user',
  handler: ValidateUsers
})

//validate username exists in system
server.route({
  method:'GET',
  path:'/user/user-name-exists/{user_name}',
  handler:ValidateUserExists
})

//Change password based on userid
server.route({
  method: 'GET',
  path:'/user/change-password/{user_name}',
  handler:ChangePassword
})

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
// console.log("Welcome to node js web project.");

// console.log(process.env.MY_SECRET);

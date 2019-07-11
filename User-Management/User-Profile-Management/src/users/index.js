import Users from "./model";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import "dotenv/config";

//chek whether user_name exists in our system and Create a user
export const CreateUsers = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    console.log("Auth", authToken);
    const chkUserExist = await Users.find({"user_name": request.payload.user_name});
    console.log('User Exists', chkUserExist.length);
    if(chkUserExist.length >= 1)
      return h.response({Message: "Username exists already in system"})
    else {
      const reqPayload = new Users(request.payload);
      const savePayload = await reqPayload.save();
      console.log('User Exists', chkUserExist.length);
      return h.response({Message: "User registered successfully " + savePayload.user_name, status: 200});
    }
    
    // if (!authToken)
    //   return h.response({
    //     auth: false,
    //     Message: "No token provided.",
    //     status: 401
    //   });
    // try {
    //   var decoded = jwt.verify(authToken, process.env.secret);
    //   console.log("Token Decode", decoded);
    //   const reqPayload = new Users(request.payload);
    //   const savePayload = await reqPayload.save();
    //   return h.response(savePayload);
    // } catch (err) {
    //   console.log("Error Decoded Token", err.message);
    //   return h.response({ Message: "Token Expired" });
    // }
  } catch (error) {
    return h.response(error).code(500);
  }
};

const VerifyToken = jwttoken => {
  console.log("Token Passed", jwttoken);
  try {
    var decoded = jwt.verify(authToken, process.env.secret);
    console.log("Decoded Token", decoded);

    return true;
  } catch (err) {
    console.log("Error Decoded Token", err.message);
    return false;
  }
};

//Get All Contactus  details
export const AllUsers = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    console.log("Auth", authToken);
    if (!authToken)
      return h.response({
        auth: false,
        Message: "No token provided.",
        status: 401
      });
    try {
      const token = request.headers.authorization.split(" ")[1];
      console.log("Header", request.headers.authorization, "-----", token);
      var decoded = jwt.verify(token, process.env.secret);
      // console.log("Decoded Token", decoded);
      const lstAllUsers = await Users.find().exec();
      return h.response(lstAllUsers);
    } catch (err) {
      // console.log("Error Decoded Token", err.message);
      return h.response({ Message: "Token Expired" });
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Update Contactus based on ID
export const UpdateUsersById = async (request, h) => {
  try {
    var result = await Users.findByIdAndUpdate(
      request.params.id,
      request.payload,
      { new: true }
    );
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Delete Contactus based on id
export const DeleteUsersById = async (request, h) => {
  try {
    const result = await Users.deleteOne({ _id: request.params.id });
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

export const ValidateUsers = async (request, h) => {
  try {
    var result = await Users.find(request.payload);
    // res.status(200).send({ auth: true, token: token });
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    console.log("Length", result.length, "----", request.payload.name);
    if (result.length > 0) {
      var token = jwt.sign({ id: request.payload.name }, process.env.secret, {
        expiresIn: 100 // expires in 24 hours
      });
      return h.response({ Message: "Success", token: token }).code(200);
    } else return h.response({ Message: "Invalid login details" });

    // return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Validate users list based on user_name
export const ValidateUserExists = async (request, h) => {
  try{
    const chkUserExist = await Users.find({"user_name": request.params.user_name});
    // console.log('User Exists', chkUserExist.length);
    if(chkUserExist.length >= 1)
      return h.response({Message: "Username exists already in system"})
    else {      
      return h.response({Message: "" , status: 200});
    }
  }catch(error) {
    return h.response(error).code(500);
  }
}

//Forget password  
//Based on user request email on sucess send an email link
export const ForgetPassword = async (request, h) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yoofootech@gmail.com',
        pass: 'P@ssw0rd149'
      }
    });
    
    var mailOptions = {
      from: 'yoofootech@gmail.com',
      to: request.params.email,
      subject: 'Yoofoo - Forget Password',
      text: process.env.email_link+'/change_password'
    };    
    const send_email = await transporter.sendMail(mailOptions);
    return h.response({Message: 'Email sent successfully'})
  } catch (error) {
    return h.response(error).code(500);
  }
} 

//Change password for an user
export const ChangePassword = async (request, h) => {
  try {
    // const reqChngPassPayload = new Users(request.payload);
    const reqChngPassPayload = await Users.find({"user_name": request.params.user_name});
    console.log(reqChngPassPayload, 'Change Password')
    // const savePayload = await reqChngPassPayload.save();
    return h.response("Test")
  } catch (error) {
    return h.response(error).code(500);
  }
}

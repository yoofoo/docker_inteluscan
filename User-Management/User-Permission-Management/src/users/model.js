import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    first_name: {
      type: String
    },
    last_name:{
      type: String
    },
    user_name: {
      type: String
    },
    email_id: {
      type: String
    },
    passcode: {
      type: String
    },
    phone_no: {
      type: Number
    },
    address: {
      type: String
    },
    pin_code: {
      type: Number
    },
    status: {
      default: 'active',
      type: String
    }
  },
  {
    timestamps: true
  }
);
usersSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      user_name: this.user_name,
      email_id:this.email_id,
      passcode: this.passcode,
      phone_no: this.phone_no,
      address:this.address,
      pin_code:this.pin_code
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("User", usersSchema);

export const schema = model.schema;
export default model;

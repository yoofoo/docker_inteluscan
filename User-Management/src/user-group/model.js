import mongoose, { Schema } from "mongoose";

const userGroupSchema = new Schema(
  {
    group_name: {
      type: String
    },
    description: {
      type: String
    },
    group_users:[],
    status: {
      default: 'active',
      type: String
    }
  },
  {
    timestamps: true
  }
);

userGroupSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      group_name: this.group_name,
      description: this.description,
      group_users: this.group_users,
      status: this.status
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("User_Group", userGroupSchema);

export const schema = model.schema;
export default model;

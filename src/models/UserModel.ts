import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  given_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  picture: String,
  accessToken: String,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

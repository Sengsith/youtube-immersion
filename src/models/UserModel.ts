import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  given_name: String,
  picture: String,
  // refreshToken: String,
  favorites: [String],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

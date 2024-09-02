import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken, choose different one"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already existed"],
  },
  password: {
    type: String,
    requird: [true, "password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;

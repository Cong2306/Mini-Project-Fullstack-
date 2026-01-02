const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: String,
    role: {
      type: String,
      default: "user"
    }
  },
  {
    collection: "User" // 🔥 QUAN TRỌNG NHẤT (đúng y như Compass)
  }
);

module.exports = mongoose.model("User", UserSchema);

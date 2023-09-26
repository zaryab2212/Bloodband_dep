const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, "email is required"],
      unique: [true, "email already exist"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },

    website: {
      type: String,
    },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    phone: {
      type: Number,
      require: [true, "phone is required"],
    },
    role: {
      type: String,
      require: [true, "role is required"],
      default: "donor",
      enum: ["admin", "donor", "organization", "hospital"],
    },
    name: {
      type: String,
      require: function () {
        // if (this.role === "donor" || this.role === "admin") {
        //   return true;
        // } else {
        //   return false;
        // }
      },
    },

    organizationName: {
      type: String,
      require: function () {
        // if (this.role === "organization") {
        //   return true;
        // } else {
        //   return false;
        // }
      },
    },
    hospitalName: {
      type: String,
      require: function () {
        // if (this.role === "hospital") {
        //   return true;
        // } else {
        //   return false;
        // }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    inventoryType: {
      type: String,
      require: [true, "intentory is required"],
      enum: ["in", "out"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    // email: {
    //   type: String,
    //   require: [true, "email is required"],
    // },
    bloodGroup: {
      type: String,
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
      require: [true, "bloodGroup is required"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quantity is required"],
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // require: [true, "organization is required"],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // require: function () {
      //   if (this.inventoryType === "out") {
      //     return true;
      //   }
    },

    donor: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // require: function () {
      //   if (this.inventoryType === "in") {
      //     return true;
      //   }
      // },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inventory", inventorySchema);

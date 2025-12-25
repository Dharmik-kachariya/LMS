const mongoose = require("mongoose");

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coursePurchase", coursePurchaseSchema);

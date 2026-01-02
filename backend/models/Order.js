const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        default: ""
      }
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending"
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "MOMO", "ZALOPAY", "BANK_TRANSFER"],
      default: "COD"
    }
  },
  {
    timestamps: true,
    collection: "Orders"
  }
);

module.exports = mongoose.model("Order", OrderSchema);

import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 40
    },
    status: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      required: true,
      maxlength: 40
    },
    phone: {
      type: String,
      required: true,
      maxlength: 40
    },
    total: {
      type: Number,
      required: true
    },
    method: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Order || mongoose.model('Order', orderSchema)

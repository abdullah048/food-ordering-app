import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40
    },
    prices: {
      type: [Number],
      required: true
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200
    },
    img: {
      type: String,
      required: true
    },
    extras: {
      type: [
        {
          text: {
            type: String,
            required: true
          },
          price: {
            type: Number,
            required: true
          }
        }
      ],
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema)

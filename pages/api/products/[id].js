import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
  const {
    method,
    query: { id }
  } = req

  await dbConnect()

  if (method === 'GET') {
    try {
      const product = await Product.findById(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'PUT') {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(id)
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  //   if (method === 'POST') {
  //     try {
  //       const product = await Product.create(req.body)
  //       res.status(201).json(product)
  //     } catch (error) {
  //       res.status(500).json(error)
  //       console.log(error)
  //     }
  //   }
}

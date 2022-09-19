const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
import NextCors from 'nextjs-cors'

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        // shipping_details: req.body.address,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.title
              },
              unit_amount: req.body.total * 100
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/stripe_success`,
        cancel_url: `${req.headers.origin}/?canceled=true`
      }
      const session = await stripe.checkout.sessions.create(params)
      console.log(session)
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

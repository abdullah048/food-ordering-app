//TODO:Use webhooks with stripe

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const endpointSecret =
  'whsec_5461b41d4c1ecc5e3da6451f0792874b389e034adc8659cd220526c69f447c90'
const express = require('express')
const app = express()

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event = request.body

    if (endpointSecret) {
      const signature = request.headers['stripe-signature']
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        )
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return response.sendStatus(400)
      }
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      case 'payment_method.attached':
        const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)

app.listen(3000, () => console.log('Running on port 3000'))

import { loadStripe } from '@stripe/stripe-js'

let stripePromise = null

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY)
  }
  return stripePromise
}

export default getStripe

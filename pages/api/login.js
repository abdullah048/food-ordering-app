import cookie from 'cookie'

export default function handler(req, res) {
  const { method } = req
  if (method === 'POST') {
    const { email, password } = req.body
    if (
      email === process.env.NEXT_PUBLIC_EMAIL &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.NEXT_PUBLIC_TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/'
        })
      )
      res.status(200).json({ message: 'successful' })
    }
  } else {
    res.status(400).json({ message: 'Wrong Credentials' })
  }
}

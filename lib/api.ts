import jwt from 'jsonwebtoken'

export type SignUpPayload = {
  email: string
  password: string
}

// simulating an external signup API
export async function signInService({ email }: SignUpPayload) {
  const token = jwt.sign({}, 'secret', {
    expiresIn: '2h',
  })
  const decodeToken = jwt.decode(token) as { exp: number }
  const expiresAt = decodeToken.exp

  return {
    token,
    expiresAt,
    email,
  }
}

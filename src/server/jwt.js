const fs = require('fs')
const jwt = require('jsonwebtoken')

// use 'utf8' to get string instead of byte array  (512 bit key)
const PRIVATE_KEY  = fs.readFileSync('src/server/private.key', 'utf8')
const PUBLIC_KEY  = fs.readFileSync('src/server/public.key', 'utf8')

module.exports = {
  sign: (payload, $Options) => {
    const signOptions = {
      subject:  $Options.subject, // userName
      expiresIn:  '1d',
      algorithm:  'RS256'
    }
    return jwt.sign(payload, PRIVATE_KEY, signOptions)
  },
  verify: (token, $Option) => {
    const verifyOptions = {
      subject:  $Option.subject, // userName
      expiresIn:  '1d',
      algorithm:  ['RS256']
    }
    try {
      return jwt.verify(token, PUBLIC_KEY, verifyOptions)
    } catch (err) {
      return false
    }
  },
  decode: (token) => {
    return jwt.decode(token, {complete: true})
    //returns null if token is invalid
  }
}
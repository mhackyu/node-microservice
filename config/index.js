const uuid4 = require('uuid/v4');
const successTypes = require('./success-types');
const errorTypes = require('./error-types');

module.exports = {
  appDomain: process.env.APP_DOMAIN,
  session: {
    secretKey: process.env.SESSION_SECRET_KEY || 'Sup3rS3cr3tK3y'
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || '',
    port: process.env.DB_PORT || '3306',
    sslKey: process.env.DB_SSL_KEY
  },
  jwtTypes: {
    // SSO: {
    //   secret: process.env.JWT_SSO_SECRET,
    //   options: {
    //     expiresIn: process.env.JWT_SSO_EXP || '1d',
    //     issuer: process.env.JWT_SSO_ISS,
    //     subject: process.env.JWT_SSO_SUB,
    //     audience: process.env.JWT_SSO_AUD,
    //     jwtid: uuid4()
    //   }
    // },
    VERIFY_ACCT: {
      secret: process.env.JWT_SSO_SECRET,
      options: {
        expiresIn: process.env.JWT_VERIFY_EXP || '31d',
        issuer: process.env.JWT_VERIFY_ISS,
        subject: process.env.JWT_VERIFY_SUB,
        audience: process.env.JWT_VERIFY_AUD,
        jwtid: uuid4()
      }
    }
  },
  successTypes,
  errorTypes
};

const TAG = '[User]';
const bcrypt = require('bcrypt');
const db = require('../../core/database');
const logger = require('../../core/logger');
const {
  response,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  NOT_FOUND
} = require('../../core/response');

module.exports.create = user => {
  const ACTION = '[create]';
  logger.log('info', `${TAG}${ACTION}`, { user });
  return new Promise((resolve, reject) => {
    resolve(user);
    db.execute(`INSERT INTO users SET ?`, user)
      .then(data => {
        if (data.affectedRows > 0) {
          resolve(user);
        } else {
          reject(response(INTERNAL_SERVER_ERROR));
        }
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.getByEmail = email => {
  const ACTION = '[findByEmail]';
  logger.log('info', `${TAG}${ACTION}`, { email });
  return new Promise((resolve, reject) => {
    db.execute(
      `
        SELECT id, email, firstname, lastname, is_enabled, verification_token, last_login, created_at, updated_at 
        FROM users 
        WHERE email = ?
      `,
      email
    )
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.login = (email, password) => {
  const ACTION = '[login]';
  logger.log('info', `${TAG}${ACTION}`, { email });
  return new Promise((resolve, reject) => {
    db.execute(
      `
        SELECT *
        FROM users AS u 
        WHERE u.email = ? AND u.is_enabled = 1;
      `,
      email
    )
      .then(data => {
        if (data.length > 0) {
          let user = data[0];
          checkPassword(password, user, resolve, reject);
        } else {
          reject(response(INVALID_CREDENTIALS));
        }
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.updateLastLogin = (email, password) => {
  const ACTION = '[updateLastLogin]';
  logger.log('info', `${TAG}${ACTION}`, { email });
  return new Promise((resolve, reject) => {
    db.execute(
      `
        UPDATE users SET last_login = ?
        WHERE email = ? AND is_enabled = 1;
      `,
      [new Date(), email]
    )
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};


module.exports.getByVerificationToken = token => {
  const ACTION = '[getByVerificationToken]';
  logger.log('info', `${TAG}${ACTION}`, { token });
  return new Promise((resolve, reject) => {
    db.execute(
      `
        SELECT *
        FROM users 
        WHERE verification_token = ?
      `,
      token
    )
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

module.exports.activateAccount = token => {
  const ACTION = '[activateAccount]';
  logger.log('info', `${TAG}${ACTION}`, { token });
  return new Promise((resolve, reject) => {
    db.execute(
      `
        UPDATE users SET is_enabled = true, verification_token = NULL
        WHERE verification_token = ?;
      `,
      token
    )
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};

function checkPassword(password, user, resolve, reject) {
  bcrypt
    .compare(password, user.password)
    .then(data => {
      if (data) {
        delete user.password;
        resolve(user);
        // const tok = token.sign(JWT_TYPE.SSO, { user });
        // resolve({ token: tok });
      } else {
        reject(response(INVALID_CREDENTIALS));
      }
    })
    .catch(() => {
      reject(response(INVALID_CREDENTIALS));
    });
}

const TAG = '[Location]';
const db = require('../../core/database');
const logger = require('../../core/logger');
const { response, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../core/response');

module.exports.getAll = () => {
  const ACTION = '[getAll]';
  logger.log('info', `${TAG}${ACTION}`);
  return new Promise((resolve, reject) => {
    db.execute(`SELECT * FROM locations`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(response(INTERNAL_SERVER_ERROR));
      });
  });
};
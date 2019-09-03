const TAG = '[MAIL]';
const nodemailer = require('nodemailer');
const logger = require('../logger');

function verify(transporter) {
  const ACTION = '[verify]';
  transporter.verify(function(error, success) {
    if (error) {
      logger.log('error', `${TAG}${ACTION}`, error);
    } else {
      logger.log('info', `${TAG}${ACTION}`, { msg: 'Mail transport was now created.' });
    }
  });
}

function createTransport() {
  const ACTION = '[createTransport]';
  logger.log('info', `${TAG}${ACTION}`);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  });
  verify(transporter);
  return transporter;
}

module.exports = {
  createTransport
};

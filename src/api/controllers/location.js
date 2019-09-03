const router = require('express').Router();
const Location = require('../models/location');
const { response, SUCCESS, CREATED } = require('../../core/response');

router.get('/', function(req, res) {
  Location.getAll()
    .then(result => {
      return res.success(response(SUCCESS, '', result));
    })
    .catch(err => {
      res.error(err);
    });
});

module.exports = router;

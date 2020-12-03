const { validationResult } = require('express-validator');

const Entry = require('../models/entry');

exports.getAllEntries = (req, res, next) => {
  //   // User id auth
  //   const errors = validationResult(req);
  //   console.log(errors);
  //   if (!errors.isEmpty()) {
  //       const error = new Error('Validation error - incorrect user id number!');
  //       error.statusCode = 422;
  //       throw error;
  //   }
  Entry.find()
    .then(entries =>
      res.status(200).json({
        entries,
      })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getEntry = (req, res, next) => {
  const entryId = req.params.entryId;
  Entry.findById(entryId)
    .then(entry =>
      res.status(200).json({
        entry,
      })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

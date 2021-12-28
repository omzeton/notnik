import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user';

const loginValidator = [
  body('email')
    .isEmail()
    .custom(async email => {
      const user = await User.findOne({ email });
      if (!user) return Promise.reject();
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return Promise.reject();
      const match = await bcrypt.compare(password, user.password);
      if (!match) return Promise.reject();
    }),
];

const signupValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email.')
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) return Promise.reject('Account linked with this mail already exists.');
    })
    .normalizeEmail(),
  body('password', 'Password must be 5+ chars long.')
    .trim()
    .isLength({ min: 5 }),
];

export { loginValidator, signupValidator };

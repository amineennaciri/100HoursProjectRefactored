const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const validator = require('validator');

const logInMiddleware = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

module.exports = {
    getSignUp: (req,res)=>{
        /* res.render('signup.ejs'); */
        return res.status(234).send('Welcome to the Sign Up Page!');
    },
    getLogIn: (req,res)=>{
        /* res.render('login.ejs'); */
        return res.status(234).send('Welcome to the Login Page!');
    },
    postSignUp: async (req, res, next)=>{
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
        if (validationErrors.length) {
          return res.status(400).json({ errors: validationErrors });
          //return res.redirect('../signup')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
        bcrypt.hash(req.body.password, 10, async   (err, hashedPassword) => {
          try {
            const existingUser = await User.findOne({
              $or: [
                { email: req.body.email }/* ,
                { firstName: req.body.firstName },
                { lastName: req.body.lastName } */
              ]
            });
            if (existingUser) {
              return res.status(409).json({ error: 'Account with that email address or username already exists.' });
              //return res.redirect('../signup');
            }
            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email:req.body.email,
              password: hashedPassword,
            });
            const result = await user.save();
            res.status(201).json({ message: 'User created successfully', user: result });
            //res.redirect("/");
          } catch(err) {
            return next(err);
          };
        });
      },
      postLogIn: (req, res, next)=> {
        logInMiddleware(req, res, next);
      },
      getLogOut: (req, res, next) => {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      },
}
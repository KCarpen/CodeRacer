const jwt = require('jsonwebtoken')
const sessionController = {};
const secret = 'bcryptsucks'
const db = require('../models/snippetModel');
const { shady } = require('./oauthController.js');

//creates the jwt and saves it to our cookie
sessionController.createSession = (req, res, next) => {
  console.log("in session controller, create session")
  if(res.locals.create){
  shady(secret, 0n, 21, 140n).then(token => {
  res.cookie('ssid', token, { httpOnly: true })
  if(req.body.user){
  res.cookie('username', req.body.user.username)
  }
  // console.log("we made a session")
  return res.redirect('/game')
  }).catch(err => next(err));
} else {
  return next();
}
};

//verfies that the ojwt within our cookies matches and if so stores the user's information to res.locals
sessionController.verify = (req, res, next) => {
  console.log("In session controller verified")
  if(!req.cookies.ssid) return res.redirect('/')
  shady(secret, req.cookies.ssid, 21, 140n).then(legit => {
    if(legit === true){
      console.log("Legit!", legit)
      res.locals.logged = true;
      return next();
    } else if(legit === false) {
      res.locals.logged = false;
      return next();
    } else {
      console.log("error", legit)
      throw Error(legit);
    }
  }).catch(err => {
    return next(err);
  })
  // console.log('we are in the sessionController.verify')
  // jwt.verify(req.cookies.ssid, secret, (err, result) => {
  //   if(err) {
  //     res.status(404).send('Couldn\'t verify jwt');
  //   } else {
  //     res.locals.verifiedjwt = result;
  //     // console.log('getting through verify middleware')
  //     // res.locals.bullshit = {username: "Jack", password: "passw0rd"};
  //     return next();
  //   }
  // })
};


module.exports = sessionController;
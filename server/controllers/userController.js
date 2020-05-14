const db = require('../models/snippetModel.js');
const { User } = require('../models/userModel.js');
const { shady } = require('./oauthController.js');


const userController = {};
userController.setHighScore = (req, res, next) => {
  users.findOne({})
}


userController.createUser = (req, res, next) => {
  // For testing purposes:  const { username, password } = res.locals.bullshit
  const { username, password } = req.body;
  console.log("in user controller", username, password)
    shady(password).then(hashedPassword => {
      console.log("hashed password: ", hashedPassword);
      User.create({username, hashedPassword}, (err, user) => {
        if (err) {
          console.log("error in createUser: ", err)
          return res.status(418).send('Did not successfully create user.');}
          // saved!
        res.locals.user = user;
        console.log(user)
        return next();
      });
    });
};

userController.loginUser = (req, res, next) => {
   // For testing purposes:  const { username, password } = res.locals.bullshit
  const { username, password } = req.body;
  User.findOne({username}, (err, user) => {
    if(!err) {
      shady(password, user['hashedPassword']).then(legit => {
        if(legit === true){
          console.log("Too legit to quit.")
          res.locals.user = user;
          return next();
        } else {
          return next({
            log: 'Username and password do not match',
            status: 401,
            err: legit,
          });
        }
      });
    } else {
      return next({
        log: 'Username does not exist/Could not locate user',
        status: 406,
        err: err,
      });
    }
  });
};

module.exports = userController;

// //schema for our users table in SQL DB
// // CREATE TABLE users (
// //   user_id SERIAL PRIMARY KEY,
// //   username VARCHAR(50) ,
// //   snippet_id VARCHAR(50),
// //   highest_wpm NUMERIC,
// // );

// //sets the highest_wpm field on our users table
// //as well as generates the response to the frontend depending on your resulting wpm vs the highest_wpm on the DB
// userController.setHighScore = (req, res, next) => {
//   // console.log("we are in the set highscore")
//   // console.log('hopefully wpm', req.body.wordsPerMinute)
//   // console.log("This is our verifiedJWT", res.locals.verifiedjwt)
//   // passed down from our sessionController.verify middleware containing the username from github Oauth
//   const search = res.locals.verifiedjwt.login
//   const snippet_id = req.body.snippet_id
//   //our queries onto our SQL DB
//   const query = `SELECT * FROM users WHERE username = '${search}' AND snippet_id = '${snippet_id}'`
//   const createWpmQuery = `INSERT INTO users(username, snippet_id, highest_wpm)
//                           VALUES($1, $2, $3)`
//   const value = [search, snippet_id, req.body.wordsPerMinute];
//   const updateWPMQuery = `UPDATE users
//                           SET highest_wpm = ${req.body.wordsPerMinute}
//                           WHERE username = '${search}' AND snippet_id = '${snippet_id}'`

//    db.query(query, (err, data) => {
//     // console.log('data.rows', data.rows)
//     // console.log('data', data)
//     if (err) return next(err);
// //checks so see if theres currently a highest_wpm recorded for the username on the current snippet
// //if theres no highest_wpm or the current wpm is greater than the stored highest_wpm it will assign the current wpm to it
//     if (data.rows.length === 0) {
//       console.log("we have no entry")
//       db.query(createWpmQuery, value, (err, data) => {
//         if (err) return next(err);
//         else {
//           console.log("looks like we posted something")
//           res.locals.scoreBoardResponse = {
//             message: `CONGRATULATIONS! NEW PERSONAL RECORD! WPM: ${req.body.wordsPerMinute}`,
//             wpm: req.body.wordsPerMinute
//           }
//           return next()
//         }
//       })
//     }
//     else{
//       console.log("we already have an entry")
//       if(data.rows[0].highest_wpm < req.body.wordsPerMinute)
//       {
//         db.query(updateWPMQuery, (err, data) => {
//           if (err) return next(err);
//           else {
//             console.log("looks like we updated something")
//             res.locals.scoreBoardResponse = {
//               message: `CONGRATULATIONS! NEW PERSONAL RECORD! WPM:${req.body.wordsPerMinute} `,
//               wpm: req.body.wordsPerMinute
//             }
//             return next()
//           }
//         })
//       }
// //if the highest_wpm on the DB is greater than current wpm
// //this is the response text that will be sent to the frontend
//       else {
//         console.log("looks like you have done better in the past", data.rows[0].highest_wpm)
//         res.locals.scoreBoardResponse = {
//           message: `TOUGH LUCK! YOU'VE DONE BETTER! PERSONAL BEST WPM: ${data.rows[0].highest_wpm} `,
//           wpm: data.rows[0].highest_wpm
//         }
//         return next();
//       }
//     }
//   })
// }

// module.exports = userController;
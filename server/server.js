const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser')
const socket = require('socket.io');

const app = express();

// const oauthController = require('./controllers/oauthController');
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');
const oauthController = require('./controllers/oauthController');
const PORT = 3000;
const apiRouter = require('./routes/api');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser());

const server = app.listen(PORT, () => console.log('listening on port 3000'));
const io = socket(server);

io.on('connection', socket => {
  socket.emit('mySocketId', socket.id, () => console.log('socket connection made!'));

  socket.on('newWPM', (newWPM) => {
    console.log(newWPM);
    socket.broadcast.emit('newScores', newWPM);
  })

  socket.on('disconnect', () => console.log('user disconnected!'));
})

// boiler plate to get everything working.


// production variable to ensure /build file is used when in production mode

if (process.env.NODE_ENV === 'production') {

  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}  

//Oauth flow for github
app.get('/callback',
  oauthController.getGithubToken,
  oauthController.getUser,
  sessionController.createSession,
  (req, res) => {
    if(process.env.NODE_ENV === 'development'){
      // console.log("WE ARE IN DEV ENVIRONMENT")
      res.redirect("localhost:8080");
    }
    else{
    res.sendFile(path.join(__dirname, '../index.html'))
    }
});

// end of production mode stuff.
// app.get('/', sessionController.verify, (req, res) => {
//   console.log("did we get into main route?")
//   res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// })

// // used to check the user's JWT.
// app.get('/game', sessionController.verify, (req, res, next) => { 
//   console.log("did we get into the /game route?")
//   console.log("response cookies", req.cookies.ssid)
//   res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// })

// app.get('/verify', sessionController.verify, 
// // userController.loginUser, 
// (req, res, next) => {
//   console.log("do we verify???");
//   console.log('response cookies', req.cookies)
//   res.redirect(301, '/game');
// })

app.get('/', sessionController.verify, (req, res, next) => {
  console.log("in main route", "logged in =", res.locals.logged)
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

// used to check the user's JWT.
app.get('/game', sessionController.verify, (req, res, next) => { 
  console.log("in game route", "logged in =", res.locals.logged)
  console.log("response cookies", req.cookies.ssid)
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

app.get('/verify', sessionController.verify, 
// userController.loginUser, 
(req, res, next) => {
  console.log("in verify route", "logged in =", res.locals.logged)
  console.log('response cookies', req.cookies)
  res.redirect(301, '/game');
})

//all interactions with postgresql go through our API router
app.use('/api', apiRouter)


//generic error handler
app.use('*', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})

// Error Handler
app.use(function(err, req, res, next) {
  const defaultErr = {
    log: `'MIDDLEWARE ERROR', ${err}`,
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  res.status(errorObj.status).send(JSON.stringify(errorObj.message))
})
  
module.exports = app;
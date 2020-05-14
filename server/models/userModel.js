const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fan:Welcome1@cluster0-4m5wy.mongodb.net/test?retryWrites=true&w=majority';

// connect to mongo
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // name of database
  dbName: 'coderacer'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

const Schema = mongoose.Schema;

const Users = new Schema({
  username: {type: String, required: true},
  hashedPassword: {type: String, required: true},
  currentGame: Boolean,
  loggedIn: Boolean,
  highScore: Number,
});

const User = mongoose.model('users', Users);

module.exports = {
    User,
}

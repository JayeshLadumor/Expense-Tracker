const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const config = require('../config/database');



// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt)  {
    bcrypt.hash(newUser.password, salt, function(err, hash)  {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUserByEmail = function (email,callback) {
  const query = {email:email}
  User.findOne(query,callback);
}

/*module.exports.getupdate = function (user) {
  const query={"username" : user.username};

  User.update(query,{password : user.password},{ upsert: true, new: true },function (err,doc) {
    console.log(err+doc);
  });

}*/
module.exports.setPassword = function (user,callback) {
  bcrypt.genSalt(10,function(err,salt) {
    bcrypt.hash(user.password,salt,function(err,hash) {
      if(err) throw err;
      user.password = hash;
      user.save(callback);
    });
  });
}

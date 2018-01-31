var models  = require('../models');
var express = require('express');
var router  = express.Router();

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

var users = [
  {
    id: 1,
    name: 'test',
    password: 'test'
  }
];


router.get('/', function(req, res) {
  res.render('index', {
    title: 'Sequelize: Express Example'
  });
});

router.post("/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }

  var user = null;

  models.sequelize.query(
    'SELECT * ' +
    'FROM Users ' +
    'WHERE username = "' + name + '"',
    { type: models.sequelize.QueryTypes.SELECT }
  ).then(function (data) {
    if (data.length !== 0) {
      user = data[0];

      if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
      } else {
        res.status(401).json({message:"Mot de passe incorrect"});
      }
    } else {
      res.status(401).json({message:"Cet utilisateur n'existe pas"})
    }
  })
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});

router.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
  });

module.exports = router;

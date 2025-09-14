const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Logic for user signup
exports.signup = (req, res, next) => {
// hash the password
// 2nd argument "salt" = 10 rounds = 2^10 = 1024 iterations to generate the hash
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// Logic for user login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
        if (user === null) {
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
        }
        else {
          // compare the password entered by the user with the hashed password in the database
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Paire identifiant/mot de passe incorrecte' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                      { userId: user._id }, 
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '24h' }
                    )   
                });
            })
            .catch(error => res.status(500).json({ error }));
        }   
    })
    .catch(error => res.status(500).json({ error })); 
};
const router = require('express').Router();
const { User, Game, UserGame } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req,res) => {
    // if (req.session.loggedin) {
    //     res.redirect('/');
    //     return;// return to the homepage if we are already loggined in
    // }
    res.render('login');
});

router.get('/user/:id', (req, res) => {
  User.findOne()
});
module.exports = router;
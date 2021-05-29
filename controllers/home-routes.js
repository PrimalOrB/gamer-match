const router = require('express').Router();
const { User, Game, UserGame } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage', {
    id: 1,
    appid: 70,
    name: 'Half-Life',
    img_icon_url: 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/half-life-icon.png',
    hours_played: 80
  });
});

router.get('/', (req, res) => {
  Game.findAll({
    attributes: [
      'id',
      'appid',
      'name',
      'img_icon_url'
    ]
  })
    .then(dbGameData => {

    })
});

router.get('/login', (req,res) => {
    // if (req.session.loggedin) {
    //     res.redirect('/');
    //     return;// return to the homepage if we are already loggined in
    // }
    res.render('login');
});

router.get('/game/:id', (req, res) => {
  Game.findOne();
});

router.get('/game', (req, res) => {

  res.render('single-game', {
    id: 1,
    appid: 70,
    name: 'Half-Life',
    img_icon_url: 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/half-life-icon.png',
    hours_played: 80
  });
});

router.get('/user', (req, res) => {

  res.render('single-user', {
    id: 1,
    username: 'UltronTest',
    steamid: 5788410,
    profileurl: 'https://steamcommunity.com/id/UltronTest',
    hours_played: 64
  });
});


module.exports = router;
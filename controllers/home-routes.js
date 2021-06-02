const router = require('express').Router();
const fetch = require('node-fetch');
const { User, Game, UserGame } = require('../models');
const getOwnedGames = require('../public/javascript/app');

router.get('/', (req, res) => {
  Game.findAll({
    include: [
      {
        model: User,
        through: UserGame,
        as: 'played_by',
      },
    ],
  })
    .then((dbGameData) => {
      const games = dbGameData.map((game) => game.get({ plain: true }));

      if (req.user) {
        fetch('http://localhost:3001/api/users/check', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            steamid: req.user._json.steamid,
            username: req.user._json.personaname,
            profileurl: req.user._json.profileurl,
            avatarhash: req.user._json.avatarhash,
          }),
        }).then((response) => response.json())
        .then(json => {
          getOwnedGames(req.user._json.steamid, json)
        })
        .catch(err => console.log(err));
      }
      if (!dbGameData) {
        res.render('empty', {
          user: req.user.displayName
        })
      }
        res.render('homepage', {
          games,
          user: req.user,
          loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.get('/login', (req, res) => {
  // if (req.session.loggedin) {
  //     res.redirect('/');
  //     return;// return to the homepage if we are already loggined in
  // }
  // res.render('login');
  res.redirect('/auth/steam/');
});

router.get('/dashboard', (req, res) => {
  User.findOne({
    include: [
      {
        model: Game,
        attributes: ['id', 'appid', 'name', 'img_icon_url', 'img_logo_url'],
        through: UserGame,
        as: 'games_played',
        include: {
          model: UserGame,
          attributes: ['playtime'],
        },
      },
    ],
    where: {
      id: 5, //sessionid
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      const user = dbUserData.get({ plain: true });
      res.render('dashboard', {
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/game/:id', (req, res) => {
  Game.findOne({
    include: [
      {
        model: User,
        //attributes: ['id','username','steamid','profileurl','avatarhash'],
        through: UserGame,
        as: 'played_by',
        include: {
          model: UserGame,
          attributes: ['playtime'],
        },
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbGameData) => {
      if (!dbGameData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const game = dbGameData.get({ plain: true });
      const user = this.user
      console.log(user);
      res.render('single-game', {
        game,
        user
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/user/:id', (req, res) => {
  User.findOne({
    include: [
      {
        model: Game,
        attributes: ['id', 'appid', 'name', 'img_icon_url', 'img_logo_url'],
        through: UserGame,
        as: 'games_played',
        include: {
          model: UserGame,
          attributes: ['playtime'],
        },
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      const user = dbUserData.get({ plain: true });
      res.render('single-user', {
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/loading', (req, res) => {
  res.render('loading');
});
//      ***catch unspeced urls***
// router.get('*', ( req, res ) => {
//   Game.findAll({
//       include: [{
//                   model: User,
//                   through: UserGame,
//                   as: 'played_by',
//                   include: {
//                     model : UserGame,
//                     attributes: ['playtime']
//                   }
//               }]
//       })
//       .then(dbGameData => {
//         const games = dbGameData.map(game => game.get({ plain: true }));
//         res.render('homepage', {
//           games
//           // loggedIn: req.session.loggedIn
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

module.exports = router;

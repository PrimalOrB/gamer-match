const router = require('express').Router();
const { User, Game, UserGame } = require('../models');

router.get('/', ( req, res ) => {
  Game.findAll({
      include: [{
                  model: User,
                  through: UserGame,
                  as: 'played_by'
              }]
      })
      .then(dbGameData => {
        const games = dbGameData.map(game => game.get({ plain: true }));
        const isHomepage = true;
  
        res.render('homepage', {
          games,
          isHomepage
          // loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/login', (req,res) => {
  // if (req.session.loggedin) {
  //     res.redirect('/');
  //     return;// return to the homepage if we are already loggined in
  // }
  res.render('login');
});

router.get('/dashboard', (req,res) => {
  res.render('dashboard');
})

router.get('/game/:id', (req,res) => {
    Game.findOne({
        include: [
            {
                model: User,
                //attributes: ['id','username','steamid','profileurl','avatarhash'],
                through: UserGame,
                as: 'played_by',
                include: {
                  model : UserGame,
                  attributes: ['playtime']
                }
            }
        ],
        where: {
            id: req.params.id
        }
    } )
    .then(dbGameData => {
      if (!dbGameData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const game = dbGameData.get({ plain: true });
      const isHomepage = false;
      res.render('single-game', {
        game,
        isHomepage

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/user/:id', (req,res) => {
  User.findOne({
      include: [
          {
            model: Game,
            attributes: ['id', 'appid', 'name', 'img_icon_url', 'img_logo_url'],
            through: UserGame,
            as: 'games_played',
            include: {
              model : UserGame,
              attributes: ['playtime']
            }
          }
      ],
      where: {
          id: req.params.id
      }
  } )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    const user = dbUserData.get({ plain: true });
    const isHomepage = false;
    res.render('single-user', {
      user,
      isHomepage
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//      ***catch unspeced urls***
router.get('*', ( req, res ) => {
  Game.findAll({
      include: [{
                  model: User,
                  through: UserGame,
                  as: 'played_by',
                  include: {
                    model : UserGame,
                    attributes: ['playtime']
                  }
              }]
      })
      .then(dbGameData => {
        const games = dbGameData.map(game => game.get({ plain: true }));
        const isHomepage = false;
        res.render('homepage', {
          games,
          isHomepage
          // loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;
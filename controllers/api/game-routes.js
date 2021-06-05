const router = require( 'express' ).Router();
const { Game, User, UserGame, Comment } = require( '../../models' );
const ensureAuthenticated = require('../../utils/auth.js');

    // GET /api/games
router.get('/', ( req, res ) => {
    Game.findAll( {
        include: [
                {
                    model: User,
                    through: UserGame,
                    as: 'played_by'
                }
            ]
        } )
        .then( dbGameData => res.json( dbGameData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

    // GET /api/games/1
router.get('/:id', ( req, res ) => {
    Game.findOne( {
        include: [
            {
                model: User,
                through: UserGame,
                as: 'played_by'
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','createdAt'],

                include: {
                    model: User,
                    attributes: ['id','username','avatarhash']
                },

            }
        ],
        where: {
            id: req.params.id
        }
    } )
    .then( dbGameData => {
        if( !dbGameData ) {
            res.status( 404 ).json( { message: 'No game found with this id' } );
            return;
        }
        res.json( dbGameData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    })
} );

    // POST /api/games
router.post('/', ensureAuthenticated, ( req, res ) => {
    // expects { appid: 1234, name: 'bbb', img_icon_url: 'bbb', img_logo_url: 'bbb' }
    Game.create( { 
        appid: req.body.appid,
        name: req.body.name,
        img_icon_url: req.body.img_icon_url,
        img_logo_url: req.body.img_logo_url,
    } )
    .then( dbGameData =>  res.json( dbGameData ) )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // POST /api/games/check
router.post('/check', ensureAuthenticated, ( req, res ) => {
    // expects array 
    const data = req.body

        // object to collect game data 
    const games = []
    
        // promise check each index against current games list
    var promises = data.map( (x, i) => {
        return Game.findOne( {
                    where: {
                        appid: x.appid
                    }
                } )
            .then(dbUserGameData => {
                    // if game does not exist
                if( !dbUserGameData ) {
                        // create new game
                    return Game.create( { 
                        appid: x.appid,
                        name: x.name,
                        img_icon_url: x.img_icon_url,
                        img_logo_url: x.img_logo_url,
                    } )
                    .then( dbGameDataNew =>  {
                            // post current index, and the id of the newly created game
                        games.push( { input_index: i, game_id: dbGameDataNew.dataValues.id } )
                    } )
                    .catch( err => {
                        console.log( err )
                        res.status( 500 ).json( err );
                    } );
                }
                    // push current index and matching game id
                games.push( { input_index: i, game_id: dbUserGameData.dataValues.id } )
                return;
            } ) 
            .catch( err => {
                console.log( err )
                res.status( 500 ).json( err );
            } );
      } )

        // once resolved, return the games array
      Promise.all( promises )
      .then( () => {
          res.json( games )
      } )
} );

    // DELETE /api/games/1
router.delete('/:id', ensureAuthenticated, ( req, res ) => {
    Game.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbGameData => {
        if( !dbGameData ){
            res.status( 404 ).json( { message: 'No game found with this id' } );
            return;
        }
        res.json( dbGameData ); 
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

module.exports = router
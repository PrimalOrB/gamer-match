const router = require( 'express' ).Router();
const { UserGame, User, Game } = require( '../../models' );
const ensureAuthenticated = require('../../utils/auth');

// GET /api/usergames
router.get('/', ( req, res ) => {
    UserGame.findAll( {
        include: [
                {
                    model: User,
                    as: 'played_by'
                },
                {
                    model: Game,
                    as: 'playing'
                }
            ]
        } )
        .then( dbUserGameData => res.json( dbUserGameData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

    // GET /api/usergames/1
router.get('/:id', ( req, res ) => {
    UserGame.findOne( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserGameData => {
        if( !dbUserGameData ) {
            res.status( 404 ).json( { message: 'No user game found with this id' } );
            return;
        }
        res.json( dbUserGameData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    })
} );

    // POST /api/usergames
router.post('/', ( req, res ) => {
    // expects { user_id: 'bbb', game_id: 'bbb', playtime: 1234 }
    UserGame.create( { 
        user_id: req.body.user_id,
        game_id: req.body.game_id,
        playtime: req.body.playtime,
    } )
    .then( dbUserGameData =>  res.json( dbUserGameData ) )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // PUT /api/usergames/  ( update the user games references and playtimes )
router.put('/', ( req, res ) => { 
    // expects { user_id: 'bbb', "gameIds": [ { "game":1, "playtime":12345}, { "game":2, "playtime":12345} } ] }
    UserGame.update( req.body, {
        where: {
            id: req.body.user_id
        }
    } )
    .then( ( user ) => {
        // find all associated tags from ProductTag
        return UserGame.findAll( { where: { user_id: req.body.user_id } } );
    } )
    .then( ( user ) => {

            // get ids of current listings for user
        const userGameIds = user.map( ( { id } ) => id );

            // create filtered list of new game listings
        const newGameIds = req.body.gameIds
          .filter( ( game_id ) => !userGameIds.includes( game_id ) )
          .map( ( game_id ) => {
            return {
              user_id: req.body.user_id,
              game_id: game_id.game,
              playtime: game_id.playtime
            };
          } );

            // run actions
        return Promise.all( [
                // destroy usergame listings where id references current user
            UserGame.destroy( { where: { id: userGameIds } } ),
                // create new listings
            UserGame.bulkCreate( newGameIds ),
        ] );
      } )
      .then( ( updatedUserGames ) => res.json( updatedUserGames ) )
    .catch( err => {
        console.log( err )
        res.status( 500 ) .json( err )
    } );
} );


    // DELETE /api/usergames/1
router.delete('/:id', ensureAuthenticated, ( req, res ) => {
    UserGame.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserGameData => {
        if( !dbUserGameData ){
            res.status( 404 ).json( { message: 'No user game found with this id' } );
            return;
        }
        res.json( dbUserGameData ); 
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

module.exports = router
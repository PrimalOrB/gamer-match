const router = require( 'express' ).Router();
const { UserGame, User, Game } = require( '../../models' );

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

    // DELETE /api/usergames/1
router.delete('/:id', ( req, res ) => {
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
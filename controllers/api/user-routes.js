const router = require( 'express' ).Router();
const { User, Game, UserGame } = require( '../../models' );

    // GET /api/users
router.get('/', ( req, res ) => {
    User.findAll( {
        include: [
                {
                    model: Game,
                    through: UserGame,
                    as: 'games_played'
                }
            ]
        } )
        .then( dbUserData => res.json( dbUserData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

    // GET /api/users/1
router.get('/:id', ( req, res ) => {
    User.findOne( {
        include: [
            {
                model: Game,
                through: UserGame,
                as: 'games_played'
            }
        ],
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ) {
            res.status( 404 ).json( { message: 'No user found with this id' } );
            return;
        }
        res.json( dbUserData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    })
} );

    // POST /api/users
router.post('/', ( req, res ) => {
    // expects { username: 'bbb', steamid: 'bbb', profileurl: 'bbb', avatarhash: 'bbb' }
    User.create( { 
        username: req.body.username,
        steamid: req.body.steamid,
        profileurl: req.body.profileurl,
        avatarhash: req.body.avatarhash,
    } )
    .then( dbUserData =>  res.json( dbUserData ) )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // PUT /api/users/1  ( update the user avatarhash )
router.put('/:id', ( req, res ) => { 
    // expects { avatarhash: 'bbb' }
    User.update( req.body, {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserData => {
        if( !dbUserData[0] ) {
            res.status( 404 ).json( { message: 'No user found with this id' } );
            return;
        }
        res.json( dbUserData )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ) .json( err )
    } );
} );

    // DELETE /api/users/1
router.delete('/:id', ( req, res ) => {
    User.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ){
            res.status( 404 ).json( { message: 'No user found with this id' } );
            return;
        }
        res.json( dbUserData ); 
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

module.exports = router
const router = require( 'express' ).Router();
const { User, Game, UserGame } = require( '../../models' );
const fetch = require('node-fetch');

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


    // POST /api/users/check
router.post('/check', ( req, res ) => {
    // user: {steamid: steamid, usernamg: personaname, profileurl: profileurl, avatarthash: avatarhassh}
    const data = [ req.body ]
    
        // object to collect game data 
    const user = {}
    
        // promise check each index against current games list
    const promises = data.map( x => {//x will represent each element in data
        return User.findOne( {
                    where: {
                        steamid: x.steamid
                    }
                } )
            .then(dbUserData => {
                // if user does not exist
                if( !dbUserData ) {    // need to figure out how to async this
                        // create new user
                    return User.create( { 
                        username: x.username,
                        steamid: x.steamid,
                        profileurl: x.profileurl,
                        avatarhash: x.avatarhash,
                    } )
                    .then( dbUserDataNew =>  {
                            // post current index, and the id of the newly created user
                            user.user_id= dbUserDataNew.dataValues.id
                    } )
                    .catch( err => {
                        console.log( err )
                        res.status( 500 ).json( err );
                    } );
                }
                // push current index and matching user id
                user.user_id= dbUserData.dataValues.id 
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
          res.json( user )
      } )
    
} );

// // if user does not exist
// if( !dbUserData ) {
//     // create new user
// User.create( { 
//     username: x.username,
//     steamid: x.steamid,
//     profileurl: x.profileurl,
//     avatarhash: x.avatarhash,
// } )
// .then( dbUserDataNew =>  {
//         // post current index, and the id of the newly created user
//         user.user_id= dbUserDataNew.dataValues.id
// } )
// .catch( err => {
//     console.log( err )
//     res.status( 500 ).json( err );
// } );
// return;
// }

router.post( '/logout', ( req, res ) => {
    if( req.session.loggedIn ){
        req.session.destroy( () => {
            res.status( 204 ).end();
        } );
    } else {
        res.status( 404 ).end();
    }
} )



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
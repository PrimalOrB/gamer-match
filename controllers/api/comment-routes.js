const router = require( 'express' ).Router();
const { Game, User, Comment } = require( '../../models' );

    // GET /api/comments
router.get('/', ( req, res ) => {
    Comment.findAll( {
                } )
        .then( dbCommentData => res.json( dbCommentData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

    // GET /api/commentss/1
router.get('/:id', ( req, res ) => {
    Comment.findOne( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbCommentData => {
        if( !dbCommentData ) {
            res.status( 404 ).json( { message: 'No comment found with this id' } );
            return;
        }
        res.json( dbCommentData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    })
} );

    // POST /api/comments
router.post('/', ( req, res ) => {
    // expects { comment_text: 'bbb', user_id: 1, game_id: 1 }
    Comment.create( { 
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        game_id: req.body.game_id,
    } )
    .then( dbCommentData =>  res.json( dbCommentData ) )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // DELETE /api/comments/1
router.delete('/:id', ( req, res ) => {
    Comment.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbCommentData => {
        if( !dbCommentData ){
            res.status( 404 ).json( { message: 'No comments found with this id' } );
            return;
        }
        res.json( dbCommentData ); 
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

module.exports = router
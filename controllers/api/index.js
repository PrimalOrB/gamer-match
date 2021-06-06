const router = require( 'express' ).Router();

const userRoutes = require( './user-routes.js' );
const gameRoutes = require( './game-routes.js' );
const userGameRoutes = require( './user-game-routes.js' );
const commentRoutes = require( './comment-routes.js' );

router.use( '/users', userRoutes );
router.use( '/games', gameRoutes );
router.use( '/usergames', userGameRoutes );
router.use( '/comments', commentRoutes );

module.exports = router;
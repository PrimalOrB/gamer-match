const router = require( 'express' ).Router();

const apiRoutes = require( './api' );
<<<<<<< HEAD
const authRoutes = require( './auth' );

router.use( '/api', apiRoutes);
router.use( '/auth', authRoutes);
=======
const homeRoutes = require('./home-routes.js');

router.use( '/api', apiRoutes);
router.use('/', homeRoutes);
>>>>>>> be00d1b5ee728dd34e343d119a704d3720ecba08

router.use( ( req, res ) => {
    res.status( 404) .end();
} );

module.exports = router;
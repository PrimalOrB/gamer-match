const router = require( 'express' ).Router();

const apiRoutes = require( './api' );
const authRoutes = require( './auth' );
const homeRoutes = require('./home-routes.js');

router.use( '/api', apiRoutes);
router.use( '/auth', authRoutes);
router.use('/', homeRoutes);


router.use( ( req, res ) => {
    res.status( 404) .end();
} );

module.exports = router;
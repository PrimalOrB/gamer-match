const router = require( 'express' ).Router();

const apiRoutes = require( './api' );
const authRoutes = require( './auth' );

router.use( '/api', apiRoutes);
router.use( '/auth', authRoutes);

router.use( ( req, res ) => {
    res.status( 404) .end();
} );

module.exports = router;
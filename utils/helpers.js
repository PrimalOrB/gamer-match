
module.exports = {
    format_date: date => {
        return `${ new Date( date ).getMonth() + 1 }/${ new Date( date ).getDate() }/${ new Date( date ).getFullYear() }`;
    },
    format_plural: ( word, amount ) => {
        if( amount !== 1 ) {
            return `${word}s`
        }
        return word
    },
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
}

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req,res) => {
    // if (req.session.loggedin) {
    //     res.redirect('/');
    //     return;// return to the homepage if we are already loggined in
    // }
    res.render('login');
})
module.exports = router;
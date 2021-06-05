const express = require('express')
const routes = require( './controllers/' );
const sequelize = require( './config/connection' );
const path = require( 'path' );
const passport = require('passport')
const SteamStrategy = require('./lib/passport-steam').Strategy;
const util = require('util')
const session = require('express-session')
const ensureAuthenticated = ( './utils/helpers.js')
const exphbs = require('express-handlebars');// for Handlebars.js
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({ });

require( 'dotenv' ).config();
const PORT = process.env.PORT || 3001;
const app = express();



/**
 * Basic example demonstrating passport-steam usage within Express framework
 */

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
   returnURL: 'http://localhost:3001/auth/steam/return',    // will need updating
   realm: 'http://localhost:3001',                         // will need updating
   apiKey: process.env.API_KEY                              // ensure is in your .env
 },
 function(identifier, profile, done) {
   // asynchronous verification, for effect...
   process.nextTick(function () {

     // To keep the example simple, the user's Steam profile is returned to
     // represent the logged-in user.  In a typical application, you would want
     // to associate the Steam account with a user record in your database,
     // and return that user instead.
     profile.identifier = identifier;
     return done(null, profile);
   });
 }
));
// configure Handlebars
app.engine('handlebars', hbs.engine);// for Handlebars.js
app.set('view engine', 'handlebars');

// configure Express
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use(session({
   secret: 'your secret',
   name: 'name of session id',
   resave: true,
   saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(__dirname + '/../../public'));
app.use(express.static(path.join(__dirname,'..','public')));

app.use( routes );

sequelize.sync( { force: false } ).then( () => {
    app.listen( PORT, () => console.log( 'Now listening' ) );
} );


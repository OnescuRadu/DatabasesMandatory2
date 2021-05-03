const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { errorHandler, logger } = require('./middleware');
const { compare } = require('bcrypt');

const db = require('./db');
const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler, logger);

const port = 3000;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    async function (username, password, done) {
      try {
        const user = await db.user.findUnique({ where: { email: username } });
        if (!user) {
          return done(null, false);
        }
        compare(password, user.password, function(err, result) {
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(require('./routes'));

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server started on port: ${port}`);
});

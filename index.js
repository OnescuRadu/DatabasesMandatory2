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
app.use(logger);

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
                const user = await db.user.findFirst({ where: { email: username, deleted: false } });
                if (!user) {
                    return done(null, false);
                }
                compare(password, user.password, function (err, result) {
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
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));

const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'MongoDB backed REST API',
            title: 'Databases Final Project',
            version: '1.0.0',
        },
        host: process.env.BASE_URL,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server started on port: ${port}`);
});

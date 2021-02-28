const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const PORT = 8081;
const router = require('./routes');
const resetDb = require('./controllers').other;
const passport = require('passport')
const cors = require('cors')
const initPassport = require('./config/passport-config')
const session = require('express-session')
const UserModel = require('./models').User;

const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};



initPassport(
  passport,
  async (email) => {
    return await UserModel.findOne({ where: { email: email } });
  },
  async (id) => {
    return await UserModel.findOne({ where: { id: id } });
  }
);


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "cookieLogin",
    cookie: {
      httpOnly: false,
      maxAge: 3600000
    }
  })
);

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.use('/api', router);

app.get('/dev/reset', resetDb.reset);


app.listen(PORT, () => {
  console.log(`RESTFul services running on ${PORT}`)
})



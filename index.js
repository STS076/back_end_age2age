const express = require("express");
var https = require('https');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('rootpath')();
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// parse requests of content-type - application/json

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const session = require('express-session');

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002'],
  credentials: true,

}));

// app.use(session({
//   secret: 'mySecretKey',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// app.get("/isConnected", (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   if (req.session.username) {
//     res.json({ isConnected: true });
//   } else {
//     res.json({ isConnected: false });
//   }
// });

// app.post("/login", (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   const { User, password } = req.body;
//   if (User === "admin" && password === "admin") {
//     req.session.username = { User };
//     req.session.authenticated = true;

//     res.json({ isConnected: true });
//   } else {
//     res.json({ isConnected: false });
//   }
// });

app.use('/users', require('./app/controllers/user.controller'));
app.use('/adverts', require('./app/controllers/advert.controller'))
app.use('/role', require('./app/controllers/role.controllers'))
app.use('/categories', require('./app/controllers/categories.controllers'))
app.use('/comments', require('./app/controllers/comments.controllers'))
app.use('/messages', require('./app/controllers/messages.controllers'))
app.use('/userFavourite', require('./app/controllers/user_has_favouvrite'))

// global error handler
app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

var options = {
  key: fs.readFileSync('./certificate/key.pem'),
  cert: fs.readFileSync('./certificate/cert.pem')
};

var server = https.createServer(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

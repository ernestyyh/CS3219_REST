let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/mhfi_traps', { useNewUrlParser: true });

var db = mongoose.connection;

// Check database connection
if (db) {
  console.log("Successfully connected to database")
} else {
  console.log("Error connecting to database")
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to MouseHunt Floating Islands Trap Setups'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running MouseHunt Floating Islands Trap Setups on port " + port);
});

// Export app for testing
module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
//getting the nessary files 
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const CSV_Upload = require('./routes/api/UploadCSV');

const app = express();


//@route    GET  api/profile/test 
//@desc     To test the route for profile
//access    Public
router.get('/', (req, res) => res.json({
    msg: "CSV Works"
}));



//Upload CSV WE acquire the following libaries 
const csv = require('csv');


//CORS SETTINGs
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization ");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUTS");
    next();
});
//body parser settings
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//config the db here!
const db = require('./Config/Keys').mongoURI;
//console.log(db);

//connection to the mongo db
mongoose
    .connect(db)
    .then(() => console.log("Mongo Connected Horray!"))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport config

require('./Config/passport')(passport);


//using routes to navigate to apis
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/UploadCSV', CSV_Upload);

//check which port its running on 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(port));
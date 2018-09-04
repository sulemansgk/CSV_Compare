const express = require('express');
const mongoose = require('mongoose');
const app = express();


//getting the nessary files 
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


//config the db here!
const db = require('./Config/Keys').mongoURI;
//console.log(db);

//connection to the mongo db
mongoose
    .connect(db)
    .then(() => console.log("Mongo Connected Horray!"))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello World!!"));


//using routes to navigate to apis
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//check which port its running on 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(port));
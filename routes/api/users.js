const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../../Config/Keys');
const passport = require('passport');
//load the user model here .. 
const Users = require('../../models/Users');
//validation to check that the inputs are sarces
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route    GET  api/users/test 
//@desc     To test the route for users
//access    Public
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));


//@route    POST  api/users/resgisteration 
//@desc     To register the users for the application
//access    Public
router.post('/register', (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Users.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email Already exists'
                });
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new Users({

                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

            }
        });

});


//@route    GET  api/users/login 
//@desc     To login the users / returing the tokens
//access    Public

router.post('/Login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //Checking the user exists via email

    Users.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.json({
                    msg: "Usernotfound"
                });
            }

            //check the password if the password if found 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //user matched and the token is assigned 
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } // to create a JWT payload
                        jwt.sign(payload, Keys.SecretOrKey, {
                            expiresIn: 3600 // the token will expire after an hour and the user has to login again, this is done for security 
                        }, (err, token) => {

                            res.json({
                                msg: 'success',
                                token: 'Bearer ' + token
                            });


                        });
                    } else {
                        return res.json({
                            msg: "passwordnotcorrect"
                        });
                    }
                });
        });



});



//@route    GET  api/users/currentUser 
//@desc     to return the current users
//access    private
router.post('/CheckingCredentials', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    res.json(req.user);
});
module.exports = router;
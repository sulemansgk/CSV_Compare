const express = require('express');
const router = express.Router();

//@route    GET  api/profile/test 
//@desc     To test the route for profile
//access    Public
router.get('/test', (req, res) => res.json({
    msg: "Profile Works"
}));

module.exports = router;
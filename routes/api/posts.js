const express = require('express');
const router = express.Router();

//@route GET  api/post/test 
//@desc to test the route for post
router.get('/test', (req, res) => res.json({
    msg: "Posts Works"
}));

module.exports = router;
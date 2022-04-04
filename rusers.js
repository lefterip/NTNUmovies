const router = require('express').Router();

const {check} = require('express-validator');
const {registerUser,loginUser} = require('../controllers/cusers');


router.post('/register',[
    check('email').isEmail(),
    check('password').isLength({min:8}),
    check('name').isLength({min:3,max:25})
    ], registerUser)

router.post('/login',[
    check('email').isEmail(),
    check('password').isLength({min:8}),
    ],loginUser)


module.exports = router
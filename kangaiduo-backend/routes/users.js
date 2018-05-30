var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

const IsSigninMiddleware = require('../middlewares/IsSigninMiddleware')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//定义路由用router.route,他能在同个路径使用post和get请求

//定义登陆路由
router.route('/signin') 
  //抽离业务逻辑到Controller
  .get(UserController.userSignin) 
  .post(UserController.userSignin)

//定义注册路由
router.route('/signup')
  //抽离业务逻辑到Controller
  .get(UserController.userSignup) 
  .post(UserController.userSignup)

//定义是否登陆路由
router.route('/issignin')
  .get(IsSigninMiddleware, UserController.isSignin)

module.exports = router;
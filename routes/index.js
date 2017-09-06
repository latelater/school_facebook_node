
let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let authorization = require('../utils/authorization');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.post('/user/user_info', authorization.requireLogin, user.user_info);
module.exports = router;


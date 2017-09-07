
let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let img = require('../controllers/imgs');
let authorization = require('../utils/authorization');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.post('/user/user_info', authorization.requireLogin, user.user_info);
router.post('/img/uploadImg', authorization.requireLogin, img.uploadImg);
module.exports = router;


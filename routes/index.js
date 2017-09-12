
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
router.post('/img/uploadImg', img.uploadImg);
router.post('/img/createRemark', img.createRemark);
router.post('/img/getAllImgs', img.getAllImgs);
// router.post('/img/addMark', authorization.requireLogin, img.addMark);
router.post('/img/addMark', img.addMark);

module.exports = router;


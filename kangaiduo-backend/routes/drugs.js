var express = require('express');
var router = express.Router();

const DrugsController = require('../controllers/DrugsController');
const Fileupload = require('../middlewares/fileupload');

//分页
router.route('/list')
    .get(DrugsController.list)

//添加
router.route('/add')
    .post(Fileupload('drugsImg'), DrugsController.add);

//回填编辑
router.route('/item/:id')
    .get(DrugsController.item)

//编辑
router.route('/edit/:id')
    .post(Fileupload('drugsImg'), DrugsController.edit)

//删除
router.route('/remove/:id')
    .get(DrugsController.remove)

//搜索
router.route('/search')
    .post(DrugsController.search)

module.exports = router
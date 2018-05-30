const DrugsModel = require('../models/drugsModel');
require('../utils/date.format.util');

//查询所有数据
const list = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    DrugsModel.findAll({
        cb:(result) =>{
            console.log(result);
            if (result) {
                res.render('drugs/succ.ejs', {
                    message: '药品列表获取成功!',
                    errcode: '',
                    success: true,
                    data: JSON.stringify(result)
                })
            } else {
                res.render('drugs/err.ejs', {
                    message: '药品列表获取失败!',
                    errcode: 11,
                    success: false,
                    data: ''
                })
            }
        }
    })
}

//添加
const add = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    console.log(req.body);
    DrugsModel.add({
        ...req.body,
        drugsImg: req.fileName,
        create_time: new Date().Format('yyyy-MM-dd hh:mm'),
        cb: (result) => {
            console.log(result)
            if (result) {
                res.render('drugs/succ.ejs', {
                    message: "药品添加成功!",
                    errcode: "",
                    success: true,
                    data: true
                })
            } else {
                res.render('drugs/err.ejs', {
                    message: "药品添加失败!",
                    errcode: 11,
                    success: false,
                    data: false
                })
            }
        }
    })
}

//回填编辑
const item = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const id = req.params.id;
    const result = await DrugsModel.findOne(id);
    console.log(result);
    res.render('drugs/succ.ejs', {
        message: '药品查询成功!',
        errcode: 11,
        success: false,
        data: JSON.stringify(result)
    })
}

//编辑
const edit = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const id = req.params.id;
    const result = await DrugsModel.update({
        id,
        ...req.body,
        drugsImg: req.fileName,
        create_time: new Date().Format('yyyy-MM-dd hh:mm')
    })
    if (result) {
        res.render('drugs/succ.ejs', {
            message: '药品重新编辑成功!',
            errcode: '',
            success: true,
            data: true
        })
    } else {
        res.render('drugs/err.ejs', {
            message: '药品重新编辑失败!',
            errcode: 11,
            success: false,
            data: false
        })
    }
}

//删除
const remove = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const id = req.params.id;
    const result = await DrugsModel.remove(id);
    if (result) {
        res.render('drugs/succ.ejs', {
            message: '药品删除成功!',
            errcode: 0,
            success: true,
            data: 0
        })
    } else {
        res.render('drugs/err.ejs', {
            message: '药品删除失败!',
            errcode: 11,
            success: false,
            data: ''
        })
    }
}

//删除
const search = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const keywords = req.body.keywords;
    const result = await DrugsModel.search(keywords);
    if (result) {
        res.render('drugs/succ.ejs', {
            message: '药品查询成功!',
            errcode: '',
            success: true,
            data: JSON.stringify(result)
        })
    } else {
        res.render('drugs/err.ejs', {
            data: {
                message: '药品查询失败!',
                errcode: 11,
                success: false,
                data: ''
            }
        })
    }
}

module.exports = {
    list,
    add,
    item,
    edit,
    remove,
    search
}
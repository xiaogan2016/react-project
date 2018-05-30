const mongoose = require('./config');

const Schema = mongoose.Schema;

const drugsSchema = new Schema({
    drugsName: {
        type: String,
        required: true
    },
    drugsImg: {
        type: String,
        required: true
    },
    drugsDescribe: {
        type: String,
        required: true
    },
    drugsType: {
        type: String,
        required: true
    },
    drugsPrice: {
        type: String,
        required: true
    },
    create_time: {
        type: String,
        required: true
    }
})

const Drugs = mongoose.model('drugs', drugsSchema);

//添加
const add = ({ drugsName, drugsImg, drugsDescribe, drugsType,drugsPrice,create_time, cb }) => {
    new Drugs({
        drugsName,
        drugsImg,
        drugsDescribe,
        drugsType,
        create_time,
        drugsPrice
    })
        .save()
        .then(() => {
            cb(true)
        })
        .catch((err) => {
            cb(false)
        })
}

//查询所有数据
const findAll = ({cb}) => {
    Drugs.find()
        .sort({ _id: -1 })
        .then((result) => {
            cb(result)
        })
        .catch((err) => {
            cb(false)
        })
}

//查询列表
const list = ({ limit, skip, cb }) => {
    Drugs.find()
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 })
        .then((result) => {
            cb(result)
        })
        .catch((err) => {
            cb(false)
        })
}

//查询回填将要编辑的商品信息
const findOne = (id) => {
    return Drugs.findById(id)
        .then((result) => {
            return result
        })
        .catch(() => {
            return false
        })
}

//更新
const update = ({ id, drugsName, drugsImg, drugsDescribe, drugsType,drugsPrice, create_time }) => {
    return Drugs.findByIdAndUpdate(id, { drugsName, drugsImg, drugsDescribe, drugsType, drugsPrice,create_time })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

//删除
const remove = (id) => {
    return Drugs.findByIdAndRemove(id)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

//搜索
const search = (keywords) => {
    return Drugs.find({   
        drugsDescribe: new RegExp(keywords), 
    })
        .then((result) => {
            console.log(result)
            return result
        })
        .catch(() => {
            return false
        })
}


module.exports = {
    add,
    list,
    findAll,
    findOne,
    update,
    remove,
    search
}
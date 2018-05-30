const mongoose = require('./config');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    isUse:{
        type:Boolean,
        default:true
    },
    create_time:{
        type:String,
        required:true
    }

})

const User = mongoose.model('users', userSchema);

const signup = (signupData,cb) => {
    const username = signupData.username;

    //查询注册数据
    User.find({username})
        .then((findResult) => {   
            //console.log(findResult);//返回一个数组
            if(findResult.length > 0){
                cb(false);
            }else{     
                //存取注册数据
                new User(signupData).save()
                .then(() => {
                    cb(true);
                })
                .catch(() => {
                    cb(false);
                }) 
            }
        })
}

const signin = ({username,cb}) => {
    //查询管理员登陆信息
    User.findOne({username})
        .then((findResult) => {
            if(findResult){
                //console.log(findResult);
                cb(findResult)
            }else{     
                cb(false)
            }
        })
        .catch((error) => {
            console.log(error)
            cb(false)
        })
}

module.exports = {
    signup,
    signin
}
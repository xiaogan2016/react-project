const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const fs =require('fs');

//引入token工具包
const jwt = require('jsonwebtoken');

require('../utils/date.format.util');

//用户注册
const userSignup = (req,res,next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    //接收数据
    const {username,password,phone,checkcode} = req.body;
    console.log(req.body);

    //对password加密
    bcrypt.hash(password,10)
        .then((bcryptPsw) => {
            //传输数据给model
            const signUpData = {
                username,
                password:bcryptPsw,
                phone,
                create_time:new Date().Format('yyyy-MM-dd hh:mm'),
            }
            UserModel.signup(signUpData,function(cbResult){
                console.log(cbResult);
                if(cbResult){
                    res.render('user/signup.ejs', {success: cbResult,errcode:'',message:'注册成功！'});
                }else{
                    res.render('user/signup.ejs', {success: false,errcode:'10',message:'该用户名已存在！'});
                }
                
            });
        })
    

}

//管理员登陆
const userSignin = (req,res,nex) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const {username,password,role} = req.body;
    //console.log(req.body);

    //查询是否有该管理员
    UserModel.signin({username, cb:(findResult) => {
        console.log(findResult);
        if(findResult){
            let passwordCompare = false;
            let roleCompare = false;

            //验证角色
           //console.log(findResult.role)
            if(parseInt(role)==findResult.role){
                roleCompare = true;
            }

            //验证密码
            bcrypt.compare(password, findResult.password)
            .then((compareResult) => {
                //console.log(compareResult)
                if(compareResult) {
                    passwordCompare = true;

                    //密码和角色都正确时
                    if(roleCompare && passwordCompare) {
                        //console.log('ok')
                        //todo
                        res.render('user/signin.ejs', {
                            success: true,
                            errcode:'',
                            message:'登陆成功',
                            token: genToken(findResult.username),
                            username: findResult.username
                        });
                    }else{
                        res.render('user/signin.ejs', {
                            success: false,
                            errcode:'10',
                            message:'你不是管理员,不能登陆',
                            token: "",
                            username: ""
                        });
                    }
                }else{
                    res.render('user/signin.ejs', {
                        success: false,
                        errcode:'10',
                        message:'密码错误',
                        token: "",
                        username: ""
                    });
                }
                
            })

            
        }else {
            //角色错误
            res.render('user/signin.ejs', {
                success: false,
                errcode:'10',
                message:'对不起，没有该用户',
                token: "",
                username: ""
            });
        }

      }})

}

//创建token
const genToken = (username) => {
    // 签发token
    const payload = {
        username,
        admin: true
    }

    //定制私钥
    const privateKey = fs.readFileSync('./token/private.key'); 
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
    //console.log(token)
    return token;
}

//token验证用户是否登陆
const isSignin = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    res.render('user/issignin.ejs', {
        errcode:'',
        issignin: true,
        username: req.username,
        role:1
    })
}

module.exports = {
    userSignup,
    userSignin,
    isSignin
}

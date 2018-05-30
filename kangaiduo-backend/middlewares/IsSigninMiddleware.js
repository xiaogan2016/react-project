const jwt = require('jsonwebtoken');
const fs = require('fs');

const IsSigninMiddleware  = (req,res,next) => {
    res.set('Content-Type', 'application/json; charset=utf8');
    const token = req.header('X-Access-Token');
    const publicKey = fs.readFileSync('./token/public.key');

    //解密
    jwt.verify(token, publicKey, { algorithm: 'RS256' }, function(err, decoded) {
        if (err) {
            res.render('user/issignin.ejs', {
                username: '', 
                issignin: false,
                errcode:10,
                role:1}
            )
        } else {
            console.log(decoded);
            req.username = decoded.username
            next()
        }
    });
}

module.exports = IsSigninMiddleware;
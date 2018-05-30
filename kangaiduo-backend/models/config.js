const mongoose = require('mongoose');

//连接数据库
const databaseurl = 'mongodb://localhost:27017/kangaiduo-ksy';
mongoose
	.connect(databaseurl)
	.then(() => {console.log('数据库连接成功！')})
	.catch((err) => {console.log(err)})

module.exports = mongoose;
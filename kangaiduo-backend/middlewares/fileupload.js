const multer = require('multer')
const path = require('path')

let fileName = ''
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/uploads/'))
  },
  filename: (req, file, cb) => {
    fileName = file.fieldname + '-' + new Date().getTime() + '.' + getExtention(file.originalname)
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(png|jpg|jpeg|gif)$/i)) {
    cb(null, true)
  } else {
    cb(new Error('图片格式不正确！'))
  }
}

function getExtention(str) {
  const ext = str.split('.')
  return ext[ext.length-1]
}

const Fileupload = (fieldName) => {
  return (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const upload = multer({ storage, fileFilter }).single(fieldName)
    upload(req, res, (err) => {
      if (err) {
        res.render('drugs/err.ejs', {
            message: err.message,
            errcode:11,
            success:false,
            data:false
          })
      } else {
        req.fileName = fileName
        next()
      }
    })
  }
}

module.exports = Fileupload

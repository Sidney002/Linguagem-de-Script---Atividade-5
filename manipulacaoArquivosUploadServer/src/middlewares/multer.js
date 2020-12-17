const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, './public/images');
    },
    filename:(req,file,callback)=>{
        callback(null, `${Date.now().toString()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, callback)=>{
    const filesFormats = ['image/png', 'image/gif', 'image/jpg', 'image/svg', 'image/jpeg'];
    const isAcecepted = filesFormats.find(fileFormat=>fileFormat=== file.mimetype);

        if(isAcecepted){
            return callback(null,true);
        }else{
            return callback(null,false);
        }
}
module.exports = multer({
    storage,
    fileFilter
})
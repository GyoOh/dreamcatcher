let multer  = require('multer');
let imageMiddleware= require('../middlewares/image-middleware');
let imageModel= require('../models/image-model');

module.exports={
    imageUploadForm:function(req,res){
        res.render('upload-form');
     },
     storeImage:function(req,res){
        let upload = multer({
                    storage: imageMiddleware.image.storage(), 
                    allowedImage:imageMiddleware.image.allowedImage 
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              // store image in database
               let imageName = req.file.originalname;
               let inputValues = {
                  image_name: imageName
               }
             // call model
             imageModel.storeImage(inputValues, function(data){
               res.render('upload-form',{alertMsg:data})
             })
              
           }
           
        })
        
     }
}
import {code as codeMsg} from '../utils/code';
import {Img} from '../models/ImgList';
import encryptClass from "../utils/Encrypt";
import myDate from "../utils/MyDate";
const fs = require('fs');

exports.uploadImg = function(req, res, next) {
    let description = '快来添加描述吧';
    if(req.description) {
        description = res.description;
    }
    console.log(req.files);
    // console.log(req.body);
    
    if (req.files.length > 0) {
        // 获取文件的临时路径
        var tmp_path = './' + req.files[0].path;
        var target_path = './public/upload/' + req.files[0].originalname;

        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
        });
    } else {
        target_path = '';
    }

    Img.create({
        user: req.session.user,
        description: description,
        imgurl: target_path
    }, function(err, img) {
        if(err) {
            res.json({
                code:err.code,
                message: codeMsg[err.code] || codeMsg['500'],
                data: ''
            })
        } else if(img) {
            res.json({
                code: 200,
                message: codeMsg['200'],
                data: img
            })
        }
    })


}


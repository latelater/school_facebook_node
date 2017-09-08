import {code as codeMsg} from '../utils/code';
import {Img} from '../models/ImgList';
import {Remark} from '../models/remarkList';
import {Mark} from '../models/markList';
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
    console.log(target_path);
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

exports.createRemark = function(req, res, next) {
    let content = req.body.content;
    let img_id = req.body.img_id;

    Img.findOne({
        _id: img_id
    }, function(err, img) {
        if(err) {
            res.json({
                code: err.code || 10104,
                message: codeMsg[err.code] || codeMsg['10104'],
                data: ''
            })
        } else if(img) {
            Remark.create({
                user: req.session.user,
                img: img,
                content: content 
            }, function(err, remark) {
                if(err) {
                    res.json({
                        code: err.code,
                        message: codeMsg[err.code] || codeMsg['500'],
                        data: ''
                    })
                } else if(remark) {
                    res.json({
                        code: 200,
                        message: codeMsg['200'],
                        data: remark
                    })
                }
            })
        }
    })
}

exports.addMark = function(req, res, next) {
    let img_id = req.body.img_id;
    let isMark = req.body.mark;

    if(isMark === false) {
        res.json({
            code: 10108,
            message: codeMsg['10108'],
            data:''
        })
        return ;
    }

    Img.findOne({
        _id: img_id,
    }, function(err, img) {
        if(err) {
            res.json({
                code: err.code || 10104,
                message: codeMsg[err.code] || codeMsg['10104'],
                data: ''
            })
        } else if(img) {
            Mark.create({
                user: req.session.user,
                img: img,
                isMark: isMark
            }, function(err, mark) {
                if(err) {
                    res.json({
                        code: err.code,
                        message: codeMsg[err.code] || codeMsg['500'],
                        data: ''
                    })
                } else if(mark) {
                    res.json({
                        code: 200,
                        message: codeMsg['200'],
                        data: mark
                    })
                }
            })
        }
    })
}

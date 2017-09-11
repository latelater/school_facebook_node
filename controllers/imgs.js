import {code as codeMsg} from '../utils/code';
import {Img} from '../models/ImgList';
import {Remark} from '../models/remarkList';
import {Mark} from '../models/markList';
import encryptClass from "../utils/Encrypt";
import myDate from "../utils/MyDate";
import {User} from '../models/usersInfo';
const fs = require('fs');

exports.uploadImg = function(req, res, next) {
    let description = '快来添加描述吧';
    let user_id = req.body.user_id;
    if(req.description) {
        description = req.body.description;
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
    User.findOne({
        _id: user_id
    }, function(err, user){
        if(err) {
            res.json({
                code: 10102,
                message: codeMsg['10102'],
                data: ''
            })
        } else if(user) {
            Img.create({
                user: user,
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
        } else {
            res.json({
                code: 500,
                message: codeMsg['500'],
                data: ''
            })
        }
    })
}

exports.createRemark = function(req, res, next) {
    let content = req.body.content;
    let img_id = req.body.img_id;
    let user_id = req.body.user_id;
    User.findOne({
        _id: user_id
    }, function(err, user) {
        if(err) {
            res.json({
                code: 10102,
                message: codeMsg['10102'],
                data: ''
            })
        } else if(user) {
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
                        user: user,
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
                } else {
                    res.json({
                        code: 500,
                        message: codeMsg['500'],
                        data: ''
                    })
                }
            })
        }
    })
}

exports.getAllRemarks = function(req, res, next) {

},
exports.addMark = function(req, res, next) {
    let img_id = req.body.img_id;
    // let isMark = req.body.mark;
    let user_id = req.body.user_id;

    // if(isMark === false) {
    //     res.json({
    //         code: 10108,
    //         message: codeMsg['10108'],
    //         data:''
    //     })
    //     return ;
    // }

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
                    
            Remark.findOne({
                
            })
            Mark.create({
                // user: req.session.user,
                img: img,
                isMark: true
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

exports.findAllImgsMark = function(req, res, next) {
    //点赞数排序的图片列表，图片地址
}

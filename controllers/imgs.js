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
    let user_id = req.body.user_id;
    Img.findOne({
        _id: img_id,
    }, function(err, img) {
        // console.log("11111111111111111111")
        if(err) {
            // console.log("222222222222222222")
            
            res.json({
                code: err.code || 10104,
                message: codeMsg[err.code] || codeMsg['10104'],
                data: ''
            })
        } else if(img) {
            // console.log("3333333333333333")
            
            User.findOne({
                _id: user_id
            }, function(err, user){
                // console.log("444444444444444444444")
                
                if(err) {
                    // console.log("5555555555555555555555555")
                    
                    res.json({
                        code: 10102,
                        message: codeMsg['10102'],
                        data: ''
                    })
                } else if(user) {
                    // console.log("6666666666666666666666666666")
                    
                    Mark.findOne({
                        user: user,
                        img: img
                    }, function(err, mark) {
                        // console.log("77777777777777777777")
                        
                        if(mark) {
                            // console.log("8888888888888888888888888")
                            
                            res.json({
                                code: 10108,
                                message: codeMsg['10108'],
                                data: ''
                            })
                        } else if(err) {
                            // console.log("99999999999999999999999")
                            
                            if(!err.code) {
                                // console.log("*********************")
                                
                                res.json({
                                    code: err.code,
                                    message: codeMsg[err.code] || codeMsg['500'],
                                    data:''
                                })
                            } else {
                                // console.log("###############")
                                
                                Mark.create({
                                    user: user,
                                    img: img,
                                    isMark: true
                                }, function(err, mark) {
                                    // console.log("100101010100000000");
                                    
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
                        } else {
                            // console.log("###############")
                                
                            Mark.create({
                                user: user,
                                img: img,
                                isMark: true
                            }, function(err, mark) {
                                // console.log("100101010100000000");
                                
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
                        // }
                        }
                    })
                } else {
                    res.json({
                        code: 500,
                        message: codeMsg['500'],
                        data: "user err weizhi"
                    })
                }
            })        
        } else {
            res.json({
                code: 500,
                message: codeMsg['500'],
                data: "img err weizhi"
            })            
        }
    })
}

exports.findAllImgsMark = function(req, res, next) {
    //点赞数排序的图片列表，图片地址
}

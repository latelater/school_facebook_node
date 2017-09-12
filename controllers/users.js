import {code as codeMsg} from '../utils/code';
import {Img} from '../models/ImgList';
import {Remark} from '../models/remarkList';
import {Mark} from '../models/markList';
import encryptClass from "../utils/Encrypt";
import myDate from "../utils/MyDate";
import {User} from '../models/usersInfo';
const fs = require('fs');

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let gender = 'female';
    // if(typeof password != 'String')
    if(req.body.gender == 'female' || req.body.gender == 'male') {
        gender = req.body.gender;
    } else {
        res.json({
            code: 10107,
            message: codeMsg['10107'],
            data: ''
        })
        return ;
    }
    let encryptedObj = new encryptClass();
    let encryptedStr = encryptedObj.encryptedPass(password);

    User.create({
        username: username,
        password: encryptedStr,
        gender: gender
    }, function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: codeMsg[err.code] || CodeMsg['500'],
                    data: ''
                });
            } else {
                res.json({
                    code: 200,
                    message: codeMsg['200'],
                    data: user
                });
            }
        }
    );

};

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // var username = req.query.username;  
    // var password = req.query.password; 
    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            res.json({
                code: err.code,
                message: CodeMsg[err.code] || CodeMsg['10101'],
                data: err.message
            })
        } else if(user) {
            let encryptedObj = new encryptClass();
            let encryptedStr = encryptedObj.encryptedPass(password);
            if(user.password === encryptedStr) {
                req.session.user = user;
                let sessionuser = req.session;
                let cookies = req.cookies;
                res.json({
                    code: 200,
                    message: codeMsg['200'],
                    data: user._id
                })
            } else {
                res.json({
                    code: 10106,
                    message: codeMsg['10106'],
                    data: ''
                })
            }
        }
    });
};

exports.user_info = function(req, res, next) {
    let username = req.body.username;
    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            res.json({
                code: err.code,
                message: codeMsg[err.code] || codeMsg['10103'],
                data: ''
            })
        } else if(user) {  
            res.json({
                code: 200,
                message: codeMsg['200'],
                data: user
            })
        }
    })
};


exports.updateUserInfo = function(req, res, next) {
    let user_id = req.body.user._id
    let user = req.body.user
    User.update({
        _id: user_id
    },{user})
    // User.findOne({
    //     username: username
    // }, function(err, user) {
    //     if(err){
    //         res.json({
    //             code: err.code,
    //             message: codeMsg[err.code] || codeMsg['10103'],
    //             data: ''
    //         })
    //     } else if(user) {
    //         user.update({

    //         })
    //     }
    // })
};


exports.getUserAllImgs = function(req, res, next) {
    // let sort = req.body.sort;
    let user_id = req.body._id;
    User.findOne({
        _id: user_id
    }, function(err, user) {
        if(user){
            Img.find({
                user:user
            }, function(err, imgs) {
                if(imgs) {
                    res.json({
                        code: 200,
                        message: codeMsg['200'],
                        data: imgs
                    })
                } else {
                    res.json({
                        code: err.code || 500,
                        message: codeMsg[err.code] || codeMsg['500'],
                        data: ''
                    })
                }
            }).sort({"create_date": -1});
        } else {
            res.json({
                code: err.code || 500,
                message: codeMsg[err.code]
            })
        }
    })

}


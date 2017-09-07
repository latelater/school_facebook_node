const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();
let image_name = date.toString();
const ImgSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    imgname: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '快来添加描述吧',
    },
    create_date: {
        type: Date,
        default: createDate
    },
    imgurl: {
        type: String,
        default: '',
        require: true
    }
})

exports.Img = mongoose.model('Img', ImgSchema);
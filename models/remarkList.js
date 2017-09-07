const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();

const RemarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    img: {
        type: Schema.Types.ObjectId,
        ref: 'Img',
        require: true
    },
    content: {
        type: 'String',
        require: true
    }
})

exports.Remark = mongoose.model('Remark', RemarkSchema);

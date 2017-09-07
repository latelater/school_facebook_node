const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();

const MarkSchema = new Schema({
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
    isMark: {
        type: Boolean,
        require: true,
        defalt: false
    }
})

exports.Mark = mongoose.model('Mark', MarkSchema);

const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();

const MarkSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     require: true
    // },
    // img: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Img',
    //     require: true
    // },
    user_id: {
        type: String,
        require: true,
        default:''
    },
    img_id:  {
        type: String,
        require: true,
        default:''
    },
    isMark: {
        type: Boolean,
        require: true,
        default: false
    },
    create_date: {
        type: Date,
        default: createDate
    },
})

exports.Mark = mongoose.model('Mark', MarkSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recruitSchema = new Schema({
    field:{type:String, required:true},
    apply_cnt : {type: Number, required:true},
    cate_field: {type:String, required: true}
})

const applySchema = new Schema({
    date: {type: String, required: true},
    name : {type: String, required: true},
    field: {type:String, required:true},
    memo: {type:String}
})

const projectSchema = new Schema({
    title: {type:String, required:true},
    writer: {type : String, required:true},
    id: {type : String, required: true},
    date: {type : String, required: true},
    content: {
        image: [String],
        video: [String],
        text : {type: String, required:true},
        file : [String]
    },
    recruit: [recruitSchema],
    deadline : {type: String, required:true},
    is_done: {type: Boolean, required:true},
    apply : [applySchema]
})
const projectModel = mongoose.model('project',projectSchema)

module.exports = projectModel
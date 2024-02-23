const mongoose = require('mongoose');
const { Schema } = mongoose;

const recruitSchema = new Schema({
    field:{type:String, required:true},
    apply_cnt : {type: Number, required:true}
})

const applySchema = new Schema({
    date: {type: String, required: true},
    name : {type: String, required: true},
    field: {type:String, required:true},
    memo: {type:String}
})

const projectSchema = new Schema({
    title: {type:String, required:true},
    writer: {type : String},
    id: {type : String},
    date: {type : String, required: true},
    content: {
        image: {type : Array},
        video: {type: Array},
        text : {type: String, required:true},
        file : {type: Array}
    },
    recruit: [recruitSchema],
    deadline : {type: String, required:true},
    is_done: {type: Boolean, required:true},
    apply : [applySchema]
})
const projectModel = mongoose.model('project',projectSchema)

module.exports = projectModel
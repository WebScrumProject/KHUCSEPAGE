import mongoose from 'mongoose'
const Schema = mongoose.Schema

const scholarshipSchema = new Schema({
    category: {type : String, required: true},
    title: {type : String, required: true},
    link: {type : String, required: true},
    writer: {type : String, required: true},
    date: {type : String, required: true},
    content: {type : String, required: true},
    file : {type : String, required: true},
    fileName : {type : String, required: true},
})
const scholarshipModel = mongoose.model('scholarship',scholarshipSchema,'scholarship')

module.exports = scholarshipModel
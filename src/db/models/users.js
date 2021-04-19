const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    description: String,
    elements: {
        type: [String]
    },
    _id: String,
},{
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
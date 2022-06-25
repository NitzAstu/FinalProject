const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

//Cost item Schema. Adding timestamp for mongoDB Computed Pattern.
const CostItem = new Schema({
    category: String,
    sum: String,
    description: String,

}, {timestamps: true});

CostItem.plugin(findOrCreate);

module.exports = mongoose.model("CostItem", CostItem);
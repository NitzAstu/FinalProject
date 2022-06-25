const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const costItem = require('costItem');
const findOrCreate = require('mongoose-findorcreate');

//Category Schema.
const Category = new Schema({
    food: [costItem],
    health: [costItem],
    housing: [costItem],
    sport: [costItem],
    education: [costItem]
});

Category.plugin(findOrCreate);

module.exports = mongoose.model("Category", Category);
//import Model from './models/model.js';
const Model = require('./model.js');

class Word extends Model.Model{
    static table = "WordTab";
    static primary = ["Id"];
}


module.exports = {Word};
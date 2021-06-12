const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const tagSchema = Schema(
    {
        tagUId : {
            type : String,
            required : true
        }
    }
);

const Tag = mongoose.model('Tag', tagSchema);
module.exports =  Tag;

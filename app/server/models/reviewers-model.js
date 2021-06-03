const mongoose = require('mongoose')

const Schema = mongoose.Schema

const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose)

const Reviewer = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        summary: {type : String, required: true},
        orcid: {type : String, required: true},
        account: {type : String, required: true},
        company: {type : String, required: true},
        location: {type : String, required: true},
        email: {type : String, required: true},
        reviews:[{
            reviewId: String,
            title: String,
            description : String,
        }],
    },
    { timestamps: true },
)

Reviewer.plugin(autoIncrement.plugin, 'reviewers')


module.exports = mongoose.model('reviewers', Reviewer)
const Reviewer = require('../models/reviewers-model')
const faker = require('faker')
//const { expect } = require('chai')

createReviewer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a reviewer',
        })
    }

    const reviewer = new Reviewer()
    //reviewer._id = body._id -> Se genera automaticamente con mongoose-auto-increment
    reviewer.name = body.name
    reviewer.surname = body.surname
    reviewer.summary = faker.lorem.paragraph()
    reviewer.orcid = body.orcid
    reviewer.account = body.account
    reviewer.company = body.company
    reviewer.location = body.location
    reviewer.email = body.email
    
    reviewer.reviews =        {
        //"_id": 0, -> Finalmente id aleatoria para recoger posicion del array
        "reviewId": body.reviewId, //Cambiar por URL -> faker.git.shortSha()
        "title": faker.lorem.sentence(),
        "description" : faker.lorem.paragraph()
    }

    if (!reviewer) {
        return res.status(400).json({ success: false, error: err })
    }

    reviewer
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: reviewer._id,
                message: 'The reviewer has been created successfully!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'The reviewer has not been created!',
            })
        })
}

addRandomReviewtoReviewer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const randomReview = {
        //"_id": body.identificador, -> Se genera uno de mongo automaticamente para recoger solo la posicion del array (lo mismo que un _id)
        "reviewId": body.reviewId,
        "title": faker.lorem.sentence(),
        "description" : faker.lorem.text()
    }

    Reviewer.findOne({ _id: req.params.id }, (err, reviewer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'The reviewer has not been found!',
            })
        }
        reviewer.reviews.push(randomReview)
        reviewer
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: reviewer._id,
                    message: 'The reviewer has been updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'The reviewer has not been updated!',
                })
            })
    })
}

updateReviewer = async(req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Reviewer.findOne({ _id: req.params.id }, (err, reviewer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        reviewer.name = body.name
        reviewer.surname = body.surname
        reviewer.orcid = body.orcid
        reviewer.account = body.account
        reviewer.company = body.company
        reviewer.location = body.location
        reviewer.email = body.email
        reviewer
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: reviewer._id,
                    message: 'Reviewer updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Reviewer not updated!',
                })
            })
    })
}

deleteReviewer = async (req, res) => {
    await Reviewer.findOneAndDelete({ _id: req.params.id }, (err, reviewer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reviewer) {
            return res
                .status(404)
                .json({ success: false, error: `Reviewer not found` })
        }

        return res.status(200).json({ success: true, data: reviewer })
    }).catch(err => console.log(err))
}

getReviewerById = async (req, res) => {
    await Reviewer.findOne({ _id: req.params.id }, (err, reviewer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reviewer) {
            return res
                .status(404)
                .json({ success: false, error: `Reviewer not found` })
        }
        return res.status(200).json({ success: true, data: reviewer })
    }).catch(err => console.log(err))
}

getReviewers = async (req, res) => {
    await Reviewer.find({}, (err, reviewers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!reviewers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Reviewer not found` })
        }
        return res.status(200).json({ success: true, data: reviewers })
    }).catch(err => console.log(err))
}

getReviewerByReviewId = async (req, res) => {
    await Reviewer.findOne({ 'reviews.reviewId': req.params.id }, {'reviews.$': 1}, (err, reviewer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reviewer) {
            return res
                .status(404)
                .json({ success: false, error: `Review not found` })
        }
        return res.status(200).json({ success: true, data: reviewer })
    }).catch(err => console.log(err))
}

getReviewerByAccount = async (req, res) => {
    await Reviewer.findOne({ account: req.params.id }, (err, reviewer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reviewer) {
            return res
                .status(200)
                .json({ success: false, data: `Account not found` })
        }
        return res.status(200).json({ success: true, data: reviewer })
    }).catch(err => console.log(err))
}

module.exports = {
    createReviewer,
    addRandomReviewtoReviewer,
    updateReviewer,
    deleteReviewer,
    getReviewers,
    getReviewerById,
    getReviewerByReviewId,
    getReviewerByAccount,
}
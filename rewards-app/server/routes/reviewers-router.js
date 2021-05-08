const express = require('express')

const ReviewersCtrl = require('../controllers/reviewers-ctrl')

const router = express.Router()

router.post('/reviewer', ReviewersCtrl.createReviewer)
router.put('/reviewer/:id', ReviewersCtrl.addRandomReviewtoReviewer)
router.patch('/reviewer/:id', ReviewersCtrl.updateReviewer)
router.delete('/reviewer/:id', ReviewersCtrl.deleteReviewer)
router.get('/reviewer/:id', ReviewersCtrl.getReviewerById)
router.get('/reviewers', ReviewersCtrl.getReviewers)

module.exports = router
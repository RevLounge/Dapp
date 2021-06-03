import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const insertReviewer = payload => api.post(`/reviewer`, payload)
export const getAllReviewers = () => api.get(`/reviewers`)
export const addRandomReviewtoReviewer = (id, payload) => api.put(`/reviewer/${id}`, payload)
export const updateReviewer = (id, payload) => api.patch(`/reviewer/${id}`, payload)
export const deleteReviewerById = id => api.delete(`/reviewer/${id}`)
export const getReviewerById = id => api.get(`/reviewer/${id}`)
export const getReviewerByReviewId = id => api.get(`/reviewId/${id}`)
export const getReviewerByAccount = id => api.get(`/reviewAccount/${id}`)

const apis = {
    insertReviewer,
    getAllReviewers,
    addRandomReviewtoReviewer,
    updateReviewer,
    deleteReviewerById,
    getReviewerById,
    getReviewerByReviewId,
    getReviewerByAccount,
}

export default apis
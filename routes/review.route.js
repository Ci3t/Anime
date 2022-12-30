import {Router} from 'express'
import { addReview, getReviewsByAnime, removeReview, updateReview } from '../controllers/review.js'
import { isAuth } from '../middlewares/auth.js'
import { validate, validateRatings } from '../middlewares/validator.js'


export const reviewRoute = Router()

reviewRoute.post('/add/:animeId',isAuth,validateRatings,validate,addReview)
reviewRoute.patch('/:reviewId',isAuth,validateRatings,validate,updateReview)
reviewRoute.delete('/:reviewId',isAuth,removeReview)
reviewRoute.get('/get-reviews-by-anime/:animeId',getReviewsByAnime)
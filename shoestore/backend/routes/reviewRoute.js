import express from 'express'
import authUser from '../middleware/auth.js'
import { addReview, getReviewsByProduct } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// Thêm review
reviewRouter.post('/add', authUser, addReview);

// Lấy reviews theo sản phẩm
reviewRouter.get('/review', getReviewsByProduct);

export default reviewRouter
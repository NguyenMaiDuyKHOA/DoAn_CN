import express from 'express'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { addSlide, listSlide, removeSlide } from '../controllers/slideController.js';

const slideRouter = express.Router();

slideRouter.post('/add', adminAuth, upload.single('image'), addSlide)
slideRouter.post('/remove', adminAuth, removeSlide)
slideRouter.get('/list', listSlide)

export default slideRouter
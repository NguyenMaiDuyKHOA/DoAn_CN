import express from 'express'
import { placeOrder, placeOrderMomo, placeOrderNapas, placeOrderMasterCard, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/momo', authUser, placeOrderMomo)
orderRouter.post('/napas', authUser, placeOrderNapas)
orderRouter.post('/mastercard', authUser, placeOrderMasterCard)

//User Features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
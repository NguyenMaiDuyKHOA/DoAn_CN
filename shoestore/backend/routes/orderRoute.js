import express from 'express'
import { placeOrder, placeOrderMomo, placeOrderNapas, placeOrderMasterCard, allOrders, userOrders, updateStatus, momoPayment, updatePayment, verifyMomo } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.post('/payment', adminAuth, updatePayment)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/momo', authUser, placeOrderMomo)
orderRouter.post('/momopay', authUser, momoPayment)
orderRouter.post('/verify', authUser, verifyMomo)
orderRouter.post('/napas', authUser, placeOrderNapas)
orderRouter.post('/mastercard', authUser, placeOrderMasterCard)

//User Features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
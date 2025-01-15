import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import crypto from 'crypto'
import axios from 'axios'
import { response } from 'express'

//Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cardData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing orders using Momo Method
const placeOrderMomo = async (req, res) => {
    try {
        const { orderId, resultCode, message } = req.body;

        // Kiểm tra xem thanh toán có thành công không (resultCode = 0)
        if (resultCode === '0') { // Thanh toán thành công
            // Cập nhật trạng thái payment thành true trong cơ sở dữ liệu
            await orderModel.updateOne({ orderId: orderId }, { payment: true });

            // Trả về thông báo thành công
            return res.json({ success: true, message: 'Payment successful' });
        } else {
            // Trường hợp thanh toán thất bại
            console.log(`Payment failed for orderId: ${orderId}. Message: ${message}`);
            return res.status(400).json({ success: false, message: 'Payment failed', data: req.body });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};


const momoPayment = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var orderInfo = 'pay with MoMo';
        var partnerCode = 'MOMO';
        var redirectUrl = 'http://localhost:5173/verify';
        var ipnUrl = 'https://2544-2402-800-634f-9a57-4d9-a215-638f-c453.ngrok-free.app/api/order/momo';
        var requestType = "payWithMethod";
        var extraData = '';
        var autoCapture = true;
        var lang = 'en';

        // ** Tạo dữ liệu đơn hàng **
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "MOMO",
            payment: false,
            date: Date.now()
        };

        // Lưu đơn hàng mới và lấy `_id` làm `orderId`
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        const orderId = newOrder._id.toString(); // Chuyển `_id` thành chuỗi để sử dụng

        // ** Tạo chữ ký **
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + orderId + "&requestType=" + requestType;
        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        // ** Tạo requestBody để gửi đến MoMo **
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: orderId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            signature: signature
        });

        const options = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        };

        const result = await axios(options);
        return res.json({ success: true, result: result.data });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        return res.status(500).json({
            statusCode: 500,
            message: "Server error"
        });
    }
};


const verifyMomo = async (req, res) => {
    const { orderId, resultCode, userId } = req.body

    try {
        if (Number(resultCode) === 0) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cardData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing orders using Napas Method
const placeOrderNapas = async (req, res) => {

}

//Placing orders using MasterCard Method
const placeOrderMasterCard = async (req, res) => {

}

//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Update orders status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Update orders payment from Admin panel
const updatePayment = async (req, res) => {
    try {
        const { orderId, payment } = req.body
        await orderModel.findByIdAndUpdate(orderId, { payment })
        res.json({ success: true, message: 'Payment Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderMomo, placeOrderNapas, placeOrderMasterCard, allOrders, userOrders, updateStatus, momoPayment, updatePayment, verifyMomo }
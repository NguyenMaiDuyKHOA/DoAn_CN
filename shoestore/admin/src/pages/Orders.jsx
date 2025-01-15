import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import moment from 'moment'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        if (!token) {
            return null
        }

        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const paymentHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/payment', { orderId, payment: event.target.value }, { headers: { token } })

            if (response.data.success) {
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })

            if (response.data.success) {
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [token])

    return (
        <div>
            <h3>Order Page</h3>
            <div>
                {
                    orders.map((order, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <div>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return <div>
                                                <p className='py-0.5' key={index}> {item.name}</p>
                                                <p className='py-0.5'>Quantity: {item.quantity}, Size: {item.size}</p>
                                            </div>
                                        } else {
                                            return <div>
                                                <p className='py-0.5' key={index}> {item.name}</p>
                                                <p className='py-0.5'>Quantity: {item.quantity}, Size: {item.size}</p>
                                            </div>
                                        }
                                    })}
                                </div>
                                <p className='mt-3 mb-2 font-medium'>Customer: {order.address.firstName + "" + order.address.lastName}</p>
                                <p>Address: {order.address.address + ", " + order.address.district + ", " + order.address.city}</p>
                                <p>Phone: {order.address.phone}, Email: {order.address.email}</p>
                            </div>
                            <div>
                                <p className='text-sm sm:text-[15px]'>Item: {order.items.length}</p>
                                <p className='mt-3'>Method: {order.paymentMethod}</p>
                                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date : {moment(order.date).format("DD/MM/YYYY")}</p>
                            </div>
                            <p className='text-sm sm:text-[15px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}</p>
                            <select onChange={(event) => paymentHandler(event, order._id)} value={order.payment} className='p-2 font-semibold'>
                                <option value="true">Pending</option>
                                <option value="false">Wait for Delivery</option>
                            </select>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
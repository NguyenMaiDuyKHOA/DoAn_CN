import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        district: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })

                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                // case 'momo'
                case 'momo':
                    const payment = await axios.post(backendUrl + '/api/order/momopay', orderData, { headers: { token } })
                    if (payment.data.success) {
                        window.location.href = payment.data.result.payUrl;
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ---------- Left Side ---------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVIEW'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <input required onChange={onChangeHandler} name='address' value={formData.address} type="text" placeholder='Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name='district' value={formData.district} type="text" placeholder='District' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>

            {/* ---------- Right Side ---------- */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                {/* ========== Payment Method Selection ========== */}
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* ========== Add Payment Method ========== */}
                        <div onClick={() => setMethod('momo')} className='bg-gray-400 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'momo' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.momo_icon_square_pinkbg} alt="" className='h-5 mx-4' />
                        </div>
                        <div onClick={() => setMethod('napas')} className='bg-gray-400 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'napas' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.Napas_Logo} alt="" className='h-5 mx-4' />
                        </div>
                        <div onClick={() => setMethod('mastercard')} className='bg-gray-400 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mastercard' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.mastercard_logo} alt="" className='h-5 mx-4' />
                        </div>
                        <div onClick={() => setMethod('cod')} className='bg-gray-400 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-white text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
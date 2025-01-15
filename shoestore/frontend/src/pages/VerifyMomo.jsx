import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyMomo = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams();

    const resultCode = searchParams.get('resultCode')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verify', { resultCode, orderId }, { headers: { token } })
            console.log(response.data)
            console.log(resultCode)
            console.log(orderId)
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default VerifyMomo
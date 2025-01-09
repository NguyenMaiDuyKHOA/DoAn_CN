import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden max-h-[180px]'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <div className='min-h-[50px] flex items-center'>
                <p className='pt-3 pb-1 text-sm line-clamp-2'>{name}</p>
            </div>

            <div className='flex justify-between pt-3 pb-1 text-sm'>
                {/* <p>{name}</p> */}
                <p></p>
                <p className='font-bold'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</p>
            </div>
        </Link>
    )
}

export default ProductItems
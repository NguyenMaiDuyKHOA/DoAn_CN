import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [currentState, setCurrentState] = useState('description');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }

    const onClickHandler = () => {

    }

    useEffect(() => {
        fetchProductData();
    }, [productId])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* --------Product Images-------- */}
                <div className='flex-1 flex flex-col gap-3'>
                    <div className='w-full'>
                        <img src={image} alt="" className='w-full h-auto' />
                    </div>
                    <div className='flex overflow-x-auto justify-center gap-3'>
                        {
                            productData.image.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    alt=""
                                    key={index}
                                    className='w-[18%] sm:w-[20%] flex-shrink-0 cursor-pointer border border-gray-300 hover:border-gray-500 transition-all duration-300'
                                />
                            ))
                        }
                    </div>
                </div>


                {/* --------Product Info-------- */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_dull_icon} alt="" className='w-3 5' />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData.price)}</p>
                    <pre className='mt-5 text-gray-500 md:w-4/5 whitespace-pre-wrap break-words'>{productData.description}</pre>
                    <div className='flex flex-col gap-4 my-8'>
                        <div className='flex group relative cursor-pointer'>
                            <p className=''>Select Size</p>
                            <img className='h-4 w-4' src={assets.down_icon} alt="" />
                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                                <img src={assets.table_size} alt="" />
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-red-500 bg-gray-400' : ''}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* ---------- Description & Review Section ---------- */}
            <div className='mt-20'>
                <div className='flex'>
                    <b onClick={() => setCurrentState('description')} className='border px-5 py-3 text-sm cursor-pointer'>Description Detail</b>
                    <p onClick={() => setCurrentState('review')} className='border px-5 py-3 text-sm cursor-pointer'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    {
                        currentState === 'description'
                            ? <pre className='whitespace-pre-wrap break-words'>{productData.descriptionDetail}</pre>
                            : <p className=''>Review</p>
                    }
                </div>
                {/* ---------- Display related product ---------- */}
                <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product
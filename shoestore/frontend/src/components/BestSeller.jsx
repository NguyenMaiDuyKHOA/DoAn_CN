import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller);
        setBestSeller(bestProduct);
    }, [products]);

    return (
        <div className='my-10'>
            <hr />

            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, corporis.
                </p>
            </div>

            <div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    // navigation
                    // pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    loop
                >
                    {bestSeller.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductItems
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BestSeller;
import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
    const { slide } = useContext(ShopContext)
    const [banner, setBanner] = useState([])

    useEffect(() => {
        setBanner(slide)
    }, [slide])

    return (
        <div className="mt-3 flex flex-col sm:flex-row border border-gray-400 bg-yellow-200">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
                    </div>
                    <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                        Latest Arrivals
                    </h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>
            {/* Hero Right Side */}
            <div className="w-full sm:w-1/2 items-center justify-center">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="sm:h-96 w-full"
                >
                    {/* {slide.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img className="w-auto h-full object-contain" src={image} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                    ))} */}
                    {banner.map((item, index) => (
                        // item.image ? ( // Kiểm tra nếu URL hợp lệ
                        <SwiperSlide key={item._id}>
                            <img className="w-auto h-full" src={item.image} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                    )
                    )}
                </Swiper>

            </div>
        </div>
    );
};

export default Hero;

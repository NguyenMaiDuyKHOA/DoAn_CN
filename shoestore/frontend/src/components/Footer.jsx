import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='px-10 bg-gray-800'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 pt-10 text-sm'>
                <div>
                    <img src={assets.logo_bggray800} alt="" className='mb-5 w-39' />
                    <p className='w-full md:w-2/3 text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, tempora.
                    </p>
                </div>

                <div>
                    <p className='text-xl text-gray-300 font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-400'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl text-gray-300 font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-400'>
                        <li>+84 842-088-945</li>
                        <li>shoestore@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center text-gray-400'>
                    Copyright 2024@ shoestore.com - All Right Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
    return (
        <div className=''>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img src={assets.about_img1} alt="" className='w-full md:max-w-[450px]' />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, temporibus itaque. Voluptas, neque delectus. Officia quidem cupiditate exercitationem rerum ea ducimus, optio eligendi ad debitis nulla voluptatum unde quia sed asperiores mollitia voluptatibus libero quibusdam nesciunt reiciendis pariatur dolor beatae. Distinctio praesentium veniam cumque odit alias! Pariatur voluptatem voluptatum quo?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, corrupti autem a doloribus illo fugit excepturi praesentium ullam neque facere nulla, molestiae dolor facilis natus cum quos quibusdam temporibus sed, perferendis nam. Dolores numquam, dolorum earum architecto eos id. Sit nemo fugiat deleniti odit obcaecati blanditiis perferendis praesentium? Eligendi, temporibus.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aut officia assumenda vero doloribus soluta laborum quod nihil eius minus, non ipsam, accusamus omnis itaque. Incidunt delectus laboriosam reiciendis soluta.</p>
                </div>
            </div>

            <div className='text-center text-4xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20 bg-yellow-100'>
                <div className='border px-10 md-px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur excepturi mollitia sapiente blanditiis vel aliquid minus dolorum iure eius earum.</p>
                </div>
                <div className='border px-10 md-px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur excepturi mollitia sapiente blanditiis vel aliquid minus dolorum iure eius earum.</p>
                </div>
                <div className='border px-10 md-px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur excepturi mollitia sapiente blanditiis vel aliquid minus dolorum iure eius earum.</p>
                </div>
            </div>

        </div>
    )
}

export default About
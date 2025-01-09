import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Slide = ({ token }) => {

    const [image, setImage] = useState(false)
    const [list, setList] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            image && formData.append("image", image)
            const response = await axios.post(backendUrl + '/api/slide/add', formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setImage(false)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/slide/list')
            if (response.data.success) {
                setList(response.data.slide)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeBanner = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/slide/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                <div className=''>
                    <p className='mb-2'>Upload Banner</p>
                    <div className='flex gap-2'>
                        <label htmlFor="image">
                            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='w-20' />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                    </div>
                </div>

                <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
            </form>

            <div className='mt-10'>
                <>
                    <p className='mb-2'>All Banners List</p>
                    <div className='flex flex-col gap-2'>
                        {/* ========== List Table Title ========== */}
                        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                            <b>Banner</b>
                            <b></b>
                            <b></b>
                            <b className='text-center'>Action</b>
                        </div>

                        {/* ========== Banner List ========== */}
                        {
                            list.map((item, index) => (
                                <div className='grid grid-cols-[1fr_3fr-1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 border text-sm' key={index}>
                                    <img src={item.image} alt="" className='w-80' />
                                    <p></p>
                                    <p></p>
                                    {/* <p className='text-right mb:text-center cursor-pointer text-lg'>X</p> */}
                                    <img onClick={() => removeBanner(item._id)} src={assets.bin_icon} alt="" className='w-4 ml-20 sm:w-5 cursor-pointer' />
                                </div>
                            ))
                        }
                    </div>
                </>
            </div>
        </div>

    )
}

export default Slide
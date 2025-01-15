import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [descriptionDetail, setDescriptionDetail] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Tennis")
    const [subCategory, setSubCategory] = useState("Nike")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("descriptionDetail", descriptionDetail)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setDescriptionDetail('')
                setPrice('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div className=''>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='w-20' />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20' />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className='w-20' />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='w-20' />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className=''>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter name product' className='w-full max-w-[500px] px-3 py-2' required />
            </div>
            <div className='w-full'>
                <p className=''>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Write description' className='w-full max-w-[800px] px-3 py-2 min-h-[150px]' required />
            </div>
            <div className='w-full'>
                <p className=''>Product description detail</p>
                <textarea onChange={(e) => setDescriptionDetail(e.target.value)} value={descriptionDetail} type="text" placeholder='Write description detail' className='w-full max-w-[800px] px-3 py-2 min-h-[300px]' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div className=''>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Tennis">Tennis</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Basketball">Basketball</option>
                    </select>
                </div>
                <div className=''>
                    <p className='mb-2'>Brand</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Nike">NIKE</option>
                        <option value="Adidas">ADIDAS</option>
                        <option value="Mizuno">MIZUNO</option>
                    </select>
                </div>
                <div className=''>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => {
                        if (e.target.value >= 0 || e.target.value === '') {
                            setPrice(e.target.value); // Cập nhật giá trị nếu không âm hoặc trống
                        } else {
                            setPrice(0); // Đặt về 0 nếu giá trị âm
                        }
                    }}
                        value={price} type="Number" placeholder='00' className='w-full px-3 py-2 sm:w-[120px]'
                    />
                </div>
            </div>

            <div className=''>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("39") ? prev.filter(item => item !== "39") : [...prev, "39"])}>
                        <p className={`${sizes.includes("39") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>39</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("40") ? prev.filter(item => item !== "40") : [...prev, "40"])}>
                        <p className={`${sizes.includes("40") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>40</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("41") ? prev.filter(item => item !== "41") : [...prev, "41"])}>
                        <p className={`${sizes.includes("41") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>41</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("42") ? prev.filter(item => item !== "42") : [...prev, "42"])}>
                        <p className={`${sizes.includes("42") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>42</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("43") ? prev.filter(item => item !== "43") : [...prev, "43"])}>
                        <p className={`${sizes.includes("43") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>43</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("44") ? prev.filter(item => item !== "44") : [...prev, "44"])}>
                        <p className={`${sizes.includes("44") ? "bg-gray-800 text-gray-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>44</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
        </form>
    )
}

export default Add
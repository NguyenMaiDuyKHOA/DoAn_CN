import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const List = ({ token }) => {
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedBrand, setSelectedBrand] = useState('All')
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.product)
                console.log(response.data.product.reverse())
                setFilteredProducts(response.data.product)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase()
        setSearch(keyword)
        filterProducts(keyword, selectedCategory, selectedBrand)
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value
        setSelectedCategory(category)
        filterProducts(search, category, selectedBrand)
    }

    const handleBrandChange = (e) => {
        const brand = e.target.value
        setSelectedBrand(brand)
        filterProducts(search, selectedCategory, brand)
    }

    const filterProducts = (searchKeyword, category, brand) => {
        let filtered = list

        // Search by key
        if (searchKeyword) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchKeyword) ||
                item.category.toLowerCase().includes(searchKeyword)
            )
        }

        // Filter by category
        if (category !== 'All') {
            filtered = filtered.filter(item => item.category === category)
        }

        // Filter by brand
        if (brand !== 'All') {
            filtered = filtered.filter(item => item.subCategory === brand)
        }

        setFilteredProducts(filtered)
    }

    const handleProductClick = (item) => {
        // Khi nhấp vào sản phẩm, nếu sản phẩm đã được chọn thì bỏ chọn, ngược lại chọn sản phẩm đó
        setSelectedProduct(selectedProduct && selectedProduct._id === item._id ? null : item);
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList()
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

    // Get category
    const categories = ['All', ...new Set(list.map(item => item.category))]

    // Get brand
    const brands = ['All', ...new Set(list.map(item => item.subCategory))]

    return (
        <>
            <div className='flex items-center gap-2 mb-4'>
                {/* Input Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 basis-3/5 p-2 border border-gray-300 rounded"
                />

                {/* Select box for category */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="flex-none basis-1/5 p-2 border border-gray-300 rounded"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Select box for brand */}
                <select
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="flex-none basis-1/5 p-2 border border-gray-300 rounded"
                >
                    {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* ========== List Table Title ========== */}
                <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Brand</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* ========== Product List ========== */}
                {
                    filteredProducts.map((item, index) => (
                        <div
                            className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 px-2 border text-sm'
                            key={index}
                            onClick={() => handleProductClick(item)} // Khi nhấp vào sản phẩm, gọi handleProductClick
                        >
                            <img src={item.image[0]} alt="" className='w-12' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.subCategory}</p>
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                            {/* Cột Action */}
                            <div className='flex justify-center gap-4'>
                                <Link to={`/change/${item._id}`}>
                                    <img
                                        src={assets.pen}
                                        alt="Edit"
                                        className='w-4 sm:w-5 cursor-pointer hover:text-blue-500'
                                    />
                                </Link>
                                <img
                                    onClick={() => removeProduct(item._id)}
                                    src={assets.bin_icon}
                                    alt="Delete"
                                    className='w-4 sm:w-5 cursor-pointer hover:text-red-500'
                                />
                            </div>

                            {/* Hiển thị chi tiết sản phẩm bên dưới khi sản phẩm được chọn */}
                            {selectedProduct && selectedProduct._id === item._id && (
                                <div className="col-span-6 mt-4 mx-2 p-4 border bg-yellow-100">
                                    <div className="grid grid-cols-[1fr_2fr_4fr_1fr] gap-2 px-2 mb-2">
                                        <p><strong>Image</strong></p>
                                        <p><strong>Info Product</strong></p>
                                        <p><strong>Description</strong></p>
                                        <p><strong>Price</strong></p>
                                    </div>
                                    <hr className="mb-2" />
                                    <div className="grid grid-cols-[1fr_2fr_4fr_1fr] gap-2 px-2">
                                        <div className="gap-2">
                                            {item.image.map((img, index) => (
                                                <img key={index} src={img} alt={`Product image ${index}`} className="w-20 h-20 object-cover" />
                                            ))}
                                        </div>
                                        <div>
                                            <p className='py-4'><strong>Name:</strong> {item.name}</p>
                                            <p className='py-4'><strong>Category:</strong> {item.category}</p>
                                            <p className='py-4'><strong>Brand:</strong> {item.subCategory}</p>
                                            <div className="flex">
                                                <p className='py-4'><strong>Size:</strong></p>
                                                {item.sizes.map((siz, ind) => (
                                                    <p className="mx-1 my-4" key={ind}>{siz}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <pre className='whitespace-pre-wrap break-words'>{item.descriptionDetail}</pre>
                                        </div>
                                        <p><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</strong></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List
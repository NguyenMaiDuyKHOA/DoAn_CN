import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    }

    const sortProduct = () => {
        let filterProductsCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products])

    useEffect(() => {
        sortProduct();
    }, [sortType])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>

            {/* Filter Options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Tennis'} onChange={toggleCategory} /> Tennis
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Soccer'} onChange={toggleCategory} /> Soccer
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Basketball'} onChange={toggleCategory} /> Basketball
                        </p>
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>BRAND</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Nike'} onChange={toggleSubCategory} /> NIKE
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Adidas'} onChange={toggleSubCategory} /> ADIDAS
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Mizuno'} onChange={toggleSubCategory} /> MIZUNO
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* Product Sort */}
                    <div className='flex border-2 border-gray-300 text-sm mt-2 py-3 px-2'>
                        <p className=''>Sort by:</p> {/* border-2 border-gray-300 text-sm py-2 px-2 text-sm */}
                        <select onChange={(e) => setSortType(e.target.value)} className=''> {/* border-2 border-gray-300 text-sm px-2 */}
                            <option value="relavent">Relavent</option>
                            <option value="low-high">Low to High</option>
                            <option value="high-low">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Collection
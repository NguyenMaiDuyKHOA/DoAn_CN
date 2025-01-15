import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

const Change = ({ token }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);

    // State for form fields
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionDetail, setDescriptionDetail] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Tennis');
    const [subCategory, setSubCategory] = useState('Nike');
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    // Fetch product data from API
    const getItem = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
            if (response.data.success) {
                const product = response.data.product;
                setProductData(product);
            } else {
                toast.error('Product not found');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch product');
        }
    };

    useEffect(() => {
        getItem();
    }, [productId]);

    // Set form fields when productData changes
    useEffect(() => {
        if (productData) {
            setName(productData.name || '');
            setDescription(productData.description || '');
            setDescriptionDetail(productData.descriptionDetail || '');
            setCategory(productData.category || '');
            setSubCategory(productData.subCategory || '');
            setPrice(productData.price || 0);
            setSizes(productData.sizes || []);
            setBestseller(productData.bestSeller || false);

            // Process images
            if (productData.image && productData.image.length > 0) {
                setImage1(productData.image[0] || null);
                setImage2(productData.image[1] || null);
                setImage3(productData.image[2] || null);
                setImage4(productData.image[3] || null);
            }
        }
    }, [productData]);


    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', productId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('descriptionDetail', descriptionDetail);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('price', price);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('bestseller', bestseller);
        if (image1 instanceof File) formData.append('image1', image1);
        if (image2 instanceof File) formData.append('image2', image2);
        if (image3 instanceof File) formData.append('image3', image3);
        if (image4 instanceof File) formData.append('image4', image4);

        try {
            const response = await axios.put(`${backendUrl}/api/product/change`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Product updated successfully');
                navigate('/list'); // Redirect after successful update
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update product');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    {[image1, image2, image3, image4].map((image, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img
                                src={
                                    typeof image === 'string' ? image : image ? URL.createObjectURL(image) : assets.upload_area
                                }
                                alt=""
                                className="w-20"
                            />
                            <input
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (index === 0) setImage1(file);
                                    if (index === 1) setImage2(file);
                                    if (index === 2) setImage3(file);
                                    if (index === 3) setImage4(file);
                                }}
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Other input fields */}
            <div className="w-full">
                <p>Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter product name"
                    className="w-full max-w-[500px] px-3 py-2"
                    required
                />
            </div>
            <div className="w-full">
                <p>Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="Write content here"
                    className="w-full max-w-[800px] px-3 py-2 min-h-[150px]"
                    required
                />
            </div>
            <div className="w-full">
                <p>Product Description Detail</p>
                <textarea
                    onChange={(e) => setDescriptionDetail(e.target.value)}
                    value={descriptionDetail}
                    type="text"
                    placeholder="Write content here"
                    className="w-full max-w-[800px] px-3 py-2 min-h-[300px]"
                    required
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-3 py-2"
                    >
                        <option value="Tennis">Tennis</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Basketball">Basketball</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Brand</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-3 py-2"
                    >
                        <option value="Nike">Nike</option>
                        <option value="Adidas">Adidas</option>
                        <option value="Mizuno">Mizuno</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        onChange={(e) => {
                            if (e.target.value >= 0 || e.target.value === '') {
                                setPrice(e.target.value);
                            }
                        }}
                        value={price}
                        type="number"
                        placeholder="Enter price"
                        className="w-full px-3 py-2 sm:w-[120px]"
                    />
                </div>
            </div>

            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {[39, 40, 41, 42, 43, 44].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size.toString())
                                        ? prev.filter((item) => item !== size.toString())
                                        : [...prev, size.toString()]
                                )
                            }
                        >
                            <p
                                className={`${sizes.includes(size.toString())
                                    ? 'bg-gray-800 text-gray-200'
                                    : 'bg-slate-200'
                                    } px-3 py-1 cursor-pointer`}
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller"
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                    Add to bestseller
                </label>
            </div>

            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
                UPDATE
            </button>
        </form>
    );
};

export default Change;
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Update = ({ token, productId }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Tennis");
    const [subCategory, setSubCategory] = useState("Nike");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const [productData, setProductData] = useState(null);

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

    // Hàm load dữ liệu sản phẩm khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = productData;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setBestseller(product.bestseller);
                setSizes(product.sizes);
            } catch (error) {
                toast.error("Failed to fetch product data");
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        getItem();
    }, [productId])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.put(`${backendUrl}/api/product/update/${productId}`, formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form after success
                setName('');
                setDescription('');
                setPrice('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            {/* Image upload logic */}
            {/* Product details inputs */}
            {/* The same as in Add.jsx, with updated product details */}
            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Update</button>
        </form>
    );
};

export default Update;
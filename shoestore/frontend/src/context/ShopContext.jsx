import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'VND'; //Đơn vị tiền tệ
    const delivery_fee = 30000;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [slide, setSlide] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // addToCart function
    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error('Please Select Product Size')
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    // get Card Data
    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item]) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }


    const getCartAmount = () => {
        let totalAmount = 0;

        // Kiểm tra nếu products đã có dữ liệu
        if (products.length === 0) {
            console.log('Products data is still loading...');
            return totalAmount; // Không tính toán nếu chưa có dữ liệu
        }

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            if (itemInfo) {
                for (const item in cartItems[items]) {
                    try {
                        if (cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error(error.message);
                    }
                }
            } else {
                // Nếu không tìm thấy itemInfo, bạn có thể thông báo lỗi hoặc làm gì đó
                console.log(`Product not found for item ID: ${items}`);
            }
        }

        return totalAmount;
    }


    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                const reversedProduct = response.data.product.reverse()
                setProducts(reversedProduct)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getSlideBanner = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/slide/list')
            if (response.data.success) {
                setSlide(response.data.slide)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getSlideBanner()
    }, [])

    useEffect(() => {
        getProductData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, slide, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
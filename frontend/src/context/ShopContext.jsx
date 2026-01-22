// src/context/ShopContext.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI, productAPI } from "../lib/api";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 100;
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const response = await authAPI.getSession();
                if (response.success && response.user) {
                    setUser(response.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Session error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getSession();
    }, []);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productAPI.getAll();
                if (response.success) {
                    // Transform image paths to include backend URL
                    const productsWithImages = response.products.map(product => ({
                        ...product,
                        image: product.image.map(img => `http://localhost:5001/uploads/${img}`)
                    }));
                    setProducts(productsWithImages);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
            } finally {
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const signUp = async (email, password, name) => {
        setLoading(true);
        try {
            const response = await authAPI.signup(email, password, name);
            if (response.success) {
                setUser(response.user);
                toast.success(response.message || 'Account created successfully!');
                return { data: response, error: null };
            } else {
                toast.error(response.message || 'Failed to create account');
                return { data: null, error: { message: response.message } };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating account';
            toast.error(errorMessage);
            return { data: null, error: { message: errorMessage } };
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const response = await authAPI.login(email, password);
            if (response.success) {
                setUser(response.user);
                toast.success(response.message || 'Logged in successfully!');
                return { data: response, error: null };
            } else {
                toast.error(response.message || 'Failed to login');
                return { data: null, error: { message: response.message } };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error logging in';
            toast.error(errorMessage);
            return { data: null, error: { message: errorMessage } };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            const response = await authAPI.logout();
            setUser(null);
            setCartItems({}); // Clear cart on logout
            localStorage.removeItem('cartItems'); // Clear cart from localStorage
            toast.success(response.message || 'Logged out successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error logging out';
            toast.error(errorMessage);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalAmount;
    };

    // ✅ New shared cart data array
    const cartData = [];
    for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
            const quantity = cartItems[itemId][size];
            if (quantity > 0) {
                cartData.push({ _id: itemId, size, quantity });
            }
        }
    }

    const value = {
        currency,
        delivery_fee,
        products,
        productsLoading,
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        updateQuantity,
        cartItems,
        getCartCount,
        getCartAmount,
        cartData, // 👈 now shared
        user,
        loading,
        signUp,
        signIn,
        signOut,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
//sugfhdj
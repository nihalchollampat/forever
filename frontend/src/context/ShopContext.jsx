// src/context/ShopContext.js
import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 100;
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email, password, name) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                }
            }
        });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Account created successfully! Please check your email to verify.');
        }
        setLoading(false);
        return { data, error };
    };

    const signIn = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged in successfully!');
        }
        setLoading(false);
        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out successfully!');
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
                } catch (error) {}
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
                } catch (error) {}
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
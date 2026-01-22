import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth API methods
export const authAPI = {
    // Sign up new user
    signup: async (email, password, name) => {
        const response = await api.post('/auth/signup', { email, password, name });
        return response.data;
    },

    // Login user
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    // Get current session
    getSession: async () => {
        try {
            const response = await api.get('/auth/session');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                return { success: false, user: null };
            }
            throw error;
        }
    }
};

// Product API methods
export const productAPI = {
    // Get all products
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    // Get single product by ID
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Get products by category
    getByCategory: async (category) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    // Get bestseller products
    getBestsellers: async () => {
        const response = await api.get('/products/filter/bestsellers');
        return response.data;
    }
};

export default api;

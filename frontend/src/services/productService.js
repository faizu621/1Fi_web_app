import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch products list with optional search, brand, or category filters
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('API Error [getProducts]:', error);
    throw error.response?.data || { message: 'Failed to connect to marketplace service' };
  }
};

/**
 * Fetch product by unique slug
 */
export const getProductBySlug = async (slug) => {
  try {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`API Error [getProductBySlug - ${slug}]:`, error);
    throw error.response?.data || { message: `Product '${slug}' could not be loaded` };
  }
};

/**
 * Fetch EMI plans for product by slug
 */
export const getEMIPlans = async (slug) => {
  try {
    const response = await api.get(`/products/${slug}/emi-plans`);
    return response.data;
  } catch (error) {
    console.error(`API Error [getEMIPlans - ${slug}]:`, error);
    throw error.response?.data || { message: 'Failed to retrieve EMI plans' };
  }
};

export default {
  getProducts,
  getProductBySlug,
  getEMIPlans,
};

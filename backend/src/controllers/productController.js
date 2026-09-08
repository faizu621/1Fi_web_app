import Product from '../models/Product.js';

/**
 * @desc    Health check endpoint
 * @route   GET /api/health
 * @access  Public
 */
export const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    message: '1Fi Marketplace API is operational',
    timestamp: new Date().toISOString(),
  });
};

/**
 * @desc    Get all products with filtering (search, brand, category)
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const { search, brand, category } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    if (brand) {
      filter.brand = { $regex: new RegExp(`^${brand.trim()}$`, 'i') };
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product details by slug
 * @route   GET /api/products/:slug
 * @access  Public
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with slug '${slug}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get EMI plans for a specific product by slug
 * @route   GET /api/products/:slug/emi-plans
 * @access  Public
 */
export const getEMIPlansBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).select('name slug brand emiPlans variants');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with slug '${slug}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        productName: product.name,
        slug: product.slug,
        brand: product.brand,
        emiPlans: product.emiPlans,
      },
    });
  } catch (error) {
    next(error);
  }
};

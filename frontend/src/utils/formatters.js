/**
 * Format raw number to Indian Rupee (INR) currency format (e.g. ₹1,19,900)
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate discount percentage from MRP and Selling Price
 */
export const calculateDiscount = (price, mrp) => {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

/**
 * Format tenure string (e.g. 24 -> "24 Months")
 */
export const formatTenure = (months) => {
  if (!months) return '';
  return `${months} Months`;
};

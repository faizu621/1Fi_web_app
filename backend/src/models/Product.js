import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    colorCode: { type: String, default: '#000000' },
    storage: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 10 },
  },
  { _id: false }
);

const emiPlanSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    tenure: { type: Number, required: true }, // months e.g. 3, 6, 12, 24, 36
    monthlyAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true, default: 0 },
    cashback: { type: Number, default: 0 },
    processingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    isRecommended: { type: Boolean, default: false },
  },
  { _id: false }
);

const specificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    author: { type: String, required: true },
    location: { type: String, default: 'India' },
    rating: { type: Number, default: 5 },
    date: { type: String, default: '4 months ago' },
    isVerified: { type: Boolean, default: true },
    reviewVariant: { type: String, default: 'Storage: 256 GB, Color: Silver' },
    comment: { type: String, required: true },
    imageAttachment: { type: String, default: null },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, default: 'smartphones', index: true },
    description: { type: String, required: true },
    sellerName: { type: String, default: 'Balaji Infocom' },
    soldCount: { type: Number, default: 70 },
    cashbackBadge: { type: String, default: '1% Cashback' },
    downPayment: { type: Number, default: 20235 },
    rating: { type: Number, default: 4.2 },
    images: [{ type: String }],
    highlights: [{ type: String }],
    specifications: [specificationSchema],
    includedItems: [{ type: String }],
    deliveryInfo: { type: String, default: 'Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch' },
    variants: [variantSchema],
    emiPlans: [emiPlanSchema],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Virtual calculation for discount on default/first variant
productSchema.virtual('discountPercentage').get(function () {
  if (this.variants && this.variants.length > 0) {
    const firstVariant = this.variants[0];
    if (firstVariant.mrp && firstVariant.mrp > firstVariant.price) {
      return Math.round(((firstVariant.mrp - firstVariant.price) / firstVariant.mrp) * 100);
    }
  }
  return 0;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

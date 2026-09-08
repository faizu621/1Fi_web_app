import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductBySlug } from '../services/productService.js';
import ProductGallery from '../components/ProductGallery.jsx';
import VariantSelector from '../components/VariantSelector.jsx';
import EMIPlanSelector from '../components/EMIPlanSelector.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import OneFiLogo from '../components/OneFiLogo.jsx';
import {
  Flame,
  ChevronRight,
  Shield,
  RotateCcw,
  Award,
  Truck,
  ChevronDown,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductBySlug(slug);

      if (res.success && res.data) {
        const prod = res.data;
        setProduct(prod);

        if (prod.variants && prod.variants.length > 0) {
          setSelectedVariant(prod.variants[0]);
        }

        if (prod.emiPlans && prod.emiPlans.length > 0) {
          const rec = prod.emiPlans.find((p) => p.isRecommended) || prod.emiPlans[0];
          setSelectedEmiPlan(rec);
        }
      } else {
        setError(`Product '${slug}' not found`);
      }
    } catch (err) {
      console.error('Error loading product detail:', err);
      setError(err.message || 'Unable to load product detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // Dynamic calculation for variant pricing & EMI options
  const dynamicEmiPlans = useMemo(() => {
    if (!product || !product.emiPlans || !selectedVariant) return [];

    const variantPrice = selectedVariant.price;
    const baseVariantPrice = product.variants[0]?.price || variantPrice;

    return product.emiPlans.map((plan) => {
      const ratio = variantPrice / baseVariantPrice;
      const monthlyAmount = Math.round(plan.monthlyAmount * ratio);
      const totalAmount = Math.round(plan.totalAmount * ratio);

      return {
        ...plan,
        monthlyAmount,
        totalAmount,
      };
    });
  }, [product, selectedVariant]);

  const activeEmiPlan = useMemo(() => {
    if (!selectedEmiPlan || !dynamicEmiPlans.length) return null;
    return dynamicEmiPlans.find((p) => p.id === selectedEmiPlan.id) || dynamicEmiPlans[0];
  }, [selectedEmiPlan, dynamicEmiPlans]);

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) return <ErrorState message={error || 'Product not found'} onRetry={fetchProduct} />;

  const visibleHighlights = showAllSpecs ? product.highlights : product.highlights.slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-28 px-1 sm:px-4">
      
      {/* Mobile Top App Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 1Fi Shop</span>
        </button>

        <div className="flex items-center gap-2">
          <OneFiLogo className="w-6 h-6" />
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">1Fi Mobile</span>
        </div>
      </div>

      {/* Breadcrumb path */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium px-1">
        <Link to="/" className="hover:text-purple-600 transition-colors">1Fi Shop</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to="/" className="hover:text-purple-600 transition-colors">{product.brand}</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-800 line-clamp-1">
          {product.name}
        </span>
      </nav>

      {/* Main Single Column Mobile Card Stack */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-5">
        
        {/* Product Gallery (Main Image, Thumbnails, Cashback Badge, Rating Pill) */}
        <ProductGallery
          images={product.images}
          currentVariantImage={selectedVariant?.image}
          productName={product.name}
          cashbackBadge={product.cashbackBadge}
          rating={product.rating}
        />

        {/* Product Title & Sold Badge */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {product.name} ({selectedVariant?.color}, {selectedVariant?.storage})
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Storage: <span className="font-bold text-slate-800">{selectedVariant?.storage}</span> • Color: <span className="font-bold text-slate-800">{selectedVariant?.color}</span>
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 pt-1">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>{product.soldCount || 70}+ sold on 1Fi Mutual Fund EMIs</span>
          </div>
        </div>

        {/* Device Selling Price */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Total Device Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatCurrency(selectedVariant?.price || 134900)}
              </span>
              {selectedVariant?.mrp > selectedVariant?.price && (
                <span className="text-xs font-medium text-slate-400 line-through">
                  {formatCurrency(selectedVariant.mrp)}
                </span>
              )}
            </div>
          </div>

          <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>0% Interest EMI</span>
          </div>
        </div>

        {/* Color & Storage Variant Dropdowns */}
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onSelectVariant={setSelectedVariant}
        />

        {/* 1Fi Higher Credit App Banner */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-md">
          <div>
            <h4 className="font-extrabold text-xs text-purple-100">Instant Pre-Approved EMI Credit</h4>
            <p className="text-[11px] text-purple-200 font-medium">Backed by Mutual Fund Investments</p>
          </div>
          <div className="bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-lg">
            100% Pre-approved
          </div>
        </div>

        {/* Orange EMI Tenure Radio Options & Primary Action Button */}
        <EMIPlanSelector
          emiPlans={dynamicEmiPlans}
          selectedPlan={activeEmiPlan}
          onSelectPlan={setSelectedEmiPlan}
          downPayment={product.downPayment || 20235}
          onProceed={() => setModalOpen(true)}
          productName={product.name}
        />

        {/* Seller Information */}
        <div className="text-xs font-bold text-slate-900 flex items-center gap-1 pt-2 border-t border-slate-100">
          <span>Sold By :</span>
          <span className="text-orange-500 cursor-pointer hover:underline">{product.sellerName || 'Balaji Infocom'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
        </div>

        {/* Shipping Details */}
        <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
          <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-purple-600" /> Shipping Details:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {product.deliveryInfo || 'Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch'}
          </p>
        </div>

        {/* Shop with Confidence Icons Grid */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <h4 className="font-extrabold text-xs text-slate-900">Shop with Confidence</h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <RotateCcw className="w-4 h-4 text-purple-600 shrink-0" />
              <span>2 Days Replacement</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Shield className="w-4 h-4 text-purple-600 shrink-0" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Award className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Top Brand</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Truck className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Free Express Delivery</span>
            </div>
          </div>
        </div>

        {/* Product Details Bullet Points */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Product Details & Specifications
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            {visibleHighlights.map((item, idx) => {
              const parts = item.split(':');
              if (parts.length > 1) {
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>
                      <strong className="font-bold text-slate-900">{parts[0]}:</strong>
                      {parts.slice(1).join(':')}
                    </span>
                  </li>
                );
              }
              return (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>

          {product.highlights.length > 6 && (
            <button
              onClick={() => setShowAllSpecs(!showAllSpecs)}
              className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:underline pt-1"
            >
              <span>{showAllSpecs ? 'View less' : 'View all specifications'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${showAllSpecs ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Verified Reviews Section */}
        <div className="pt-4 border-t border-slate-100">
          <ReviewsSection reviews={product.reviews} overallRating={product.rating} />
        </div>

      </div>

      {/* Order Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedEmiPlan={activeEmiPlan}
      />
    </div>
  );
};

export default ProductDetailPage;

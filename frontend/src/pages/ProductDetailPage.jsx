import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../services/productService.js';
import ProductGallery from '../components/ProductGallery.jsx';
import VariantSelector from '../components/VariantSelector.jsx';
import EMIPlanSelector from '../components/EMIPlanSelector.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import {
  Flame,
  ChevronRight,
  Shield,
  RotateCcw,
  Award,
  Truck,
  ChevronDown,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const ProductDetailPage = () => {
  const { slug } = useParams();

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
    <div className="space-y-6 pb-16">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-orange-500 transition-colors">Shop on EMI</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to="/products" className="hover:text-orange-500 transition-colors">Smart Phones</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to={`/products?brand=${product.brand}`} className="hover:text-orange-500 transition-colors">{product.brand}</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-800 line-clamp-1">
          {product.name} ({selectedVariant?.color}, {selectedVariant?.storage})
        </span>
      </nav>

      {/* 2. Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* LEFT COLUMN: Sticky Image Gallery & Custom Dropdown Selectors */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24 lg:self-start transition-all">
          <ProductGallery
            images={product.images}
            currentVariantImage={selectedVariant?.image}
            productName={product.name}
            cashbackBadge={product.cashbackBadge}
            rating={product.rating}
          />

          {/* Color & Variant Custom Dropdown Selectors */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
        </div>

        {/* RIGHT COLUMN: Title, Price, App Banner, EMI Box, Shipping, Details, Reviews */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {product.name} ({selectedVariant?.color}, {selectedVariant?.storage})
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              (Storage: {selectedVariant?.storage}, Color: {selectedVariant?.color})
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 mt-2">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{product.soldCount || 70}+ sold</span>
            </div>
          </div>

          {/* Device Selling Price */}
          <div className="pt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatCurrency(selectedVariant?.price || 134900)}
            </span>
          </div>

          {/* Higher Credit Instantly App Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Higher Credit Instantly</h4>
              <p className="text-[11px] text-slate-500">Download 1Fi App</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-md">App Store</span>
              <span className="bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-md">Google Play</span>
            </div>
          </div>

          {/* Snapmint-Style Orange EMI Tenure Box with Radio Options */}
          <EMIPlanSelector
            emiPlans={dynamicEmiPlans}
            selectedPlan={activeEmiPlan}
            onSelectPlan={setSelectedEmiPlan}
            downPayment={product.downPayment || 20235}
            onProceed={() => setModalOpen(true)}
            productName={product.name}
          />

          {/* Seller Information */}
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1 pt-1">
            <span>Sold By :</span>
            <span className="text-orange-500 cursor-pointer hover:underline">{product.sellerName || 'Balaji Infocom'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
          </div>

          {/* Shipping Details */}
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs text-slate-900">Shipping Details:</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {product.deliveryInfo || 'Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch'}
            </p>
          </div>

          {/* Shop with Confidence Icons Grid */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-extrabold text-xs text-slate-900">Shop with Confidence</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-sky-600" />
                <span>2 Days Service Centre Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-600" />
                <span>1 year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-600" />
                <span>Top Brand</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>Free Delivery</span>
              </div>
            </div>
            <button className="text-xs font-bold text-orange-500 flex items-center gap-1 pt-1 hover:underline">
              <span>View More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Details Bullet List */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Product Details
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              {visibleHighlights.map((item, idx) => {
                const parts = item.split(':');
                if (parts.length > 1) {
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400">•</span>
                      <span>
                        <strong className="font-bold text-slate-900">{parts[0]}:</strong>
                        {parts.slice(1).join(':')}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
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
                <span>{showAllSpecs ? 'View less' : 'View all'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${showAllSpecs ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* Review & Rating Section */}
          <ReviewsSection reviews={product.reviews} overallRating={product.rating} />

        </div>
      </div>

      {/* Confirmation Review Modal */}
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

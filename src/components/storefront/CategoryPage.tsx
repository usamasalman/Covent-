import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricingEngine';
import { CATEGORIES } from '../../data/catalog';
import { ArrowLeft, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { routeParam, products, navigateTo, addToCart } = useApp();
  const catSlug = routeParam || 'chelsea-boots';

  const categoryMeta = CATEGORIES.find((c) => c.slug === catSlug) || {
    name: 'Leather Boots',
    slug: catSlug,
    description: 'Master Goodyear-welted footwear handcrafted for wholesale buyers.'
  };

  const categoryProducts = products.filter(
    (p) => p.categorySlug === catSlug || catSlug === 'all'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8C7A6B]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#241B16]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('products')} className="hover:text-[#241B16]">
          Master Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#241B16] font-medium">{categoryMeta.name}</span>
      </nav>

      {/* Category Banner */}
      <div className="p-8 bg-[#F4EFEB] rounded-xl border border-[#E0D5C7] space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block">
          Wholesale Category Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
          {categoryMeta.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5D52] max-w-2xl leading-relaxed">
          {categoryMeta.description}
        </p>
      </div>

      {/* Category List */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8E1D7] pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => navigateTo('category', cat.slug)}
            className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              catSlug === cat.slug
                ? 'bg-[#2E221B] text-[#FAF7F2] font-semibold'
                : 'text-[#6B5E53] hover:bg-[#F4EFEB]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {categoryProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg border border-[#E5DDD2] space-y-3">
          <p className="font-serif text-xl font-bold text-[#241B16]">
            No styles currently in this category
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded"
          >
            Browse All Styles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((boot) => (
            <div
              key={boot.id}
              className="group bg-white rounded-lg border border-[#E5DDD2] overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div
                className="relative aspect-4/3 bg-[#F8F5F1] overflow-hidden cursor-pointer flex items-center justify-center p-2"
                onClick={() => navigateTo('products', boot.slug)}
              >
                <img
                  src={boot.images[0]}
                  alt={boot.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#241B16]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                  MOQ: {boot.moq} pairs
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#827265] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{boot.category}</span>
                    <span className="font-mono text-[11px] text-[#A69788]">{boot.sku}</span>
                  </div>
                  <h3
                    onClick={() => navigateTo('products', boot.slug)}
                    className="font-serif text-xl font-bold text-[#241B16] group-hover:text-[#684F3B] transition-colors cursor-pointer"
                  >
                    {boot.name}
                  </h3>
                  <p className="text-xs text-[#6B5E53] mt-2 line-clamp-2 leading-relaxed">
                    {boot.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0E9DF]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block">
                        Tier 1 (24-49):
                      </span>
                      <span className="text-base font-bold text-[#241B16] tabular-nums">
                        {formatCurrency(boot.tiers[0].unitPrice)} <span className="text-xs font-normal text-[#8C7A6B]">/ pair</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block">
                        Volume Tier:
                      </span>
                      <span className="text-base font-bold text-emerald-800 tabular-nums">
                        {formatCurrency(boot.tiers[boot.tiers.length - 1].unitPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigateTo('products', boot.slug)}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-[#241B16] bg-[#F4EFEB] hover:bg-[#EAE2D7] rounded transition-colors text-center"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          product: boot,
                          selectedColor: boot.colors[0],
                          assortment: boot.sizes.slice(0, 4).map((s) => ({
                            sizeUs: s.us,
                            quantity: Math.floor(boot.moq / 4)
                          })),
                          totalQuantity: boot.moq
                        })
                      }
                      className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors"
                    >
                      + Quick MOQ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricingEngine';
import { Search, Filter, Grid, List, X, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const ProductCatalogPage: React.FC = () => {
  const { products, navigateTo, addToCart } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedLeather, setSelectedLeather] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyMoqAvailable, setOnlyMoqAvailable] = useState(false);

  // Derive unique filter values from real product catalog
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  const styles = useMemo(() => {
    const set = new Set(products.map((p) => p.style));
    return ['all', ...Array.from(set)];
  }, [products]);

  const leathers = useMemo(() => {
    const set = new Set(products.map((p) => p.leatherType));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.status === 'archived') return false;

        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.leatherType.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesStyle = selectedStyle === 'all' || p.style === selectedStyle;
        const matchesGender = selectedGender === 'all' || p.gender === selectedGender;
        const matchesLeather = selectedLeather === 'all' || p.leatherType === selectedLeather;
        const matchesMoq = !onlyMoqAvailable || p.moq <= 24;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStyle &&
          matchesGender &&
          matchesLeather &&
          matchesMoq
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') {
          return a.tiers[0].unitPrice - b.tiers[0].unitPrice;
        }
        if (sortBy === 'price_high') {
          return b.tiers[0].unitPrice - a.tiers[0].unitPrice;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedStyle,
    selectedGender,
    selectedLeather,
    onlyMoqAvailable,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedGender('all');
    setSelectedLeather('all');
    setOnlyMoqAvailable(false);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedStyle !== 'all' ||
    selectedGender !== 'all' ||
    selectedLeather !== 'all' ||
    onlyMoqAvailable;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Header */}
      <div className="border-b border-[#E8E1D7] pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
              Wholesale Master Footwear Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
              Handcrafted Bench-Made Footwear
            </h1>
            <p className="text-xs sm:text-sm text-[#736458] mt-1.5 max-w-xl">
              Authentic Goodyear-welted leather boots and dress shoes. Direct factory wholesale pricing, customizable branding options, and verified European materials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#7A6C5F] tabular-nums font-medium">
              Showing {filteredProducts.length} style{filteredProducts.length === 1 ? '' : 's'}
            </span>
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#EFE9DF] rounded-md p-0.5 border border-[#DDD3C5]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#241B16] shadow-xs' : 'text-[#7A6C5F]'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#241B16] shadow-xs' : 'text-[#7A6C5F]'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by boot model, SKU, leather type..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDD3C5] rounded-md focus:outline-none focus:border-[#4A3728]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#241B16]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-[#7A6C5F] font-medium whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-white border border-[#DDD3C5] rounded-md focus:outline-none focus:border-[#4A3728] text-[#241B16]"
            >
              <option value="newest">Newest Releases</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="price_low">Wholesale Price: Low to High</option>
              <option value="price_high">Wholesale Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 pt-4 border-t border-[#EAE3DA] flex flex-wrap items-center gap-3">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1 text-xs bg-white border border-[#DDD3C5] rounded focus:outline-none text-[#241B16]"
            >
              <option value="all">All Categories</option>
              {categories
                .filter((c) => c !== 'all')
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>

          {/* Style Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider">
              Silhouette:
            </span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-2.5 py-1 text-xs bg-white border border-[#DDD3C5] rounded focus:outline-none text-[#241B16]"
            >
              <option value="all">All Styles</option>
              {styles
                .filter((s) => s !== 'all')
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>

          {/* Leather Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider">
              Leather:
            </span>
            <select
              value={selectedLeather}
              onChange={(e) => setSelectedLeather(e.target.value)}
              className="px-2.5 py-1 text-xs bg-white border border-[#DDD3C5] rounded focus:outline-none text-[#241B16]"
            >
              <option value="all">All Leather Hides</option>
              {leathers
                .filter((l) => l !== 'all')
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
          </div>

          {/* Low MOQ Check */}
          <label className="flex items-center gap-1.5 text-xs text-[#52443A] cursor-pointer pl-2">
            <input
              type="checkbox"
              checked={onlyMoqAvailable}
              onChange={(e) => setOnlyMoqAvailable(e.target.checked)}
              className="rounded text-[#4A3728]"
            />
            <span>24 Pair MOQ Only</span>
          </label>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="ml-auto text-xs text-[#8A5A2B] hover:text-[#4A3728] font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid or List */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg border border-[#E8E1D7] space-y-3">
          <p className="font-serif text-xl font-bold text-[#241B16]">
            No styles match your selected filter criteria
          </p>
          <p className="text-xs text-[#7A6C5F]">
            Try clearing filters or searching for alternative leathers, silhouettes, or SKUs.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded hover:bg-[#1E1611]"
          >
            Clear Active Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((boot) => (
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
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#241B16] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-[#E0D5C7]">
                  {boot.construction}
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

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#7A6C5F]">
                    <span>Leather: <strong className="text-[#241B16]">{boot.leatherType}</strong></span>
                    <span>·</span>
                    <span>Origin: <strong className="text-[#241B16]">{boot.countryOfOrigin}</strong></span>
                  </div>
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
                      Configure Run
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
                      title="Add standard MOQ pack to cart"
                    >
                      + Quick MOQ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProducts.map((boot) => (
            <div
              key={boot.id}
              className="p-5 bg-white rounded-lg border border-[#E5DDD2] hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5 min-w-0">
                <img
                  src={boot.images[0]}
                  alt={boot.name}
                  className="w-24 h-24 object-cover rounded bg-[#F4EFEB] shrink-0 cursor-pointer"
                  onClick={() => navigateTo('products', boot.slug)}
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-3 text-xs text-[#827265] mb-1">
                    <span className="uppercase tracking-wider font-semibold">{boot.category}</span>
                    <span>·</span>
                    <span className="font-mono">{boot.sku}</span>
                    <span>·</span>
                    <span>MOQ: {boot.moq} pairs</span>
                  </div>
                  <h3
                    onClick={() => navigateTo('products', boot.slug)}
                    className="font-serif text-xl font-bold text-[#241B16] hover:text-[#684F3B] cursor-pointer"
                  >
                    {boot.name}
                  </h3>
                  <p className="text-xs text-[#6B5E53] line-clamp-1 mt-1">
                    {boot.description}
                  </p>
                  <div className="mt-2 text-xs text-[#7A6C5F] flex items-center gap-3">
                    <span>Leather: <strong className="text-[#241B16]">{boot.leatherType}</strong></span>
                    <span>·</span>
                    <span>Lead time: <strong className="text-[#241B16]">{boot.leadTimeWeeks}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#F0E9DF]">
                <div className="text-right">
                  <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block">
                    Starting Tier:
                  </span>
                  <span className="text-base font-bold text-[#241B16] tabular-nums">
                    {formatCurrency(boot.tiers[0].unitPrice)}
                  </span>
                  <span className="text-[11px] text-emerald-700 block">
                    {formatCurrency(boot.tiers[boot.tiers.length - 1].unitPrice)} at 250+
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('products', boot.slug)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#241B16] bg-[#F4EFEB] hover:bg-[#EAE2D7] rounded transition-colors"
                  >
                    Details & Sizes
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
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors"
                  >
                    + Quick MOQ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

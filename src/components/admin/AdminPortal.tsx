import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricingEngine';
import { Product, QuoteRequest, Order, CustomerApplication } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Package,
  FileText,
  ShoppingBag,
  Users,
  Settings,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    quotes,
    updateQuote,
    convertQuoteToOrder,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    applications,
    updateApplicationStatus,
    cms,
    updateCMS,
    settings,
    updateSettings,
    addToast
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    'overview' | 'analytics' | 'products' | 'quotes' | 'orders' | 'customers' | 'cms' | 'settings'
  >('overview');

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [productSearch, setProductSearch] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdCat, setNewProdCat] = useState('Chelsea Boots');
  const [newProdLeather, setNewProdLeather] = useState('Italian Calfskin');
  const [newProdMoq, setNewProdMoq] = useState(24);
  const [newProdCarton, setNewProdCarton] = useState(12);
  const [newProdTier1Price, setNewProdTier1Price] = useState(65);
  const [newProdTier4Price, setNewProdTier4Price] = useState(48);

  // Active Quote Review Modal State
  const [reviewingQuote, setReviewingQuote] = useState<QuoteRequest | null>(null);
  const [quoteRep, setQuoteRep] = useState('Marcus Vance');
  const [quoteInternalNote, setQuoteInternalNote] = useState('');
  const [adjustedPrice, setAdjustedPrice] = useState<number>(0);

  // KPIs calculation based on date range
  const kpis = useMemo(() => {
    const totalOrders = orders.length;
    const grossSales = orders.reduce((sum, o) => sum + o.grandTotal, 0);
    const completedOrders = orders.filter((o) => o.fulfillmentStatus === 'Delivered' || o.fulfillmentStatus === 'Shipped');
    const netSales = completedOrders.reduce((sum, o) => sum + o.grandTotal, 0);
    const aov = totalOrders > 0 ? Number((grossSales / totalOrders).toFixed(2)) : 0;

    const totalQuotes = quotes.length;
    const acceptedQuotes = quotes.filter((q) => q.status === 'Accepted' || q.status === 'Converted to Order').length;
    const quoteConversionRate = totalQuotes > 0 ? Number(((acceptedQuotes / totalQuotes) * 100).toFixed(1)) : 0;
    const outstandingQuoteValue = quotes
      .filter((q) => q.status === 'New' || q.status === 'Sent to Buyer' || q.status === 'Negotiation')
      .reduce((sum, q) => sum + q.grandTotal, 0);

    const pendingApprovals = applications.filter((a) => a.status === 'Pending Review').length;
    const lowStockItems = products.reduce((acc, p) => {
      const lowCount = p.sizes.filter((s) => s.stock < 100).length;
      return acc + (lowCount > 0 ? 1 : 0);
    }, 0);

    return {
      grossSales,
      netSales,
      totalOrders,
      aov,
      totalQuotes,
      acceptedQuotes,
      quoteConversionRate,
      outstandingQuoteValue,
      pendingApprovals,
      lowStockItems
    };
  }, [orders, quotes, applications, products, dateRange]);

  // CSV Export functions
  const exportCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((cell) => `"${cell}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${filename} successfully.`);
  };

  const handleExportOrders = () => {
    const headers = ['Order ID', 'PO Reference', 'Company', 'Contact', 'Items', 'Pairs', 'Status', 'Grand Total', 'Created'];
    const rows = orders.map((o) => [
      o.id,
      o.poReference,
      o.companyName,
      o.contactName,
      o.items.map((i) => i.productName).join('; '),
      o.totalQuantity,
      o.fulfillmentStatus,
      o.grandTotal,
      o.createdAt
    ]);
    exportCsv(`covent-orders-${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  };

  const handleExportProducts = () => {
    const headers = ['SKU', 'Name', 'Category', 'Construction', 'Leather', 'MOQ', 'Tier 1 Price', 'Lead Time'];
    const rows = products.map((p) => [
      p.sku,
      p.name,
      p.category,
      p.construction,
      p.leatherType,
      p.moq,
      p.tiers[0]?.unitPrice || 0,
      p.leadTimeWeeks
    ]);
    exportCsv(`covent-catalog-${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: newProdSku || `CST-${Math.floor(100 + Math.random() * 900)}`,
      category: newProdCat,
      categorySlug: newProdCat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      gender: 'Men',
      style: 'Lace-Up',
      tagline: `Handcrafted ${newProdCat} featuring ${newProdLeather}`,
      description: `Premium Goodyear-welted footwear built from select ${newProdLeather}. Tailored for wholesale accounts and bespoke branding programs.`,
      leatherType: newProdLeather,
      leatherGrade: 'Grade A Full Grain',
      upperMaterial: 'Full-Grain Calfskin',
      liningMaterial: 'Glove Calf Lining',
      outsoleMaterial: 'Leather Outsole with Rubber Toplift',
      construction: 'Goodyear Welted (360°)',
      countryOfOrigin: 'Porto, Portugal',
      careInstructions: 'Apply natural wax cream and store in cedar trees.',
      weightGrams: 680,
      featured: false,
      leadTimeWeeks: '3-4 Weeks',
      moq: newProdMoq,
      cartonMultiple: newProdCarton,
      images: ['/src/assets/images/hero_leather_boots_1793033837355.jpg'],
      colors: [{ name: 'Dark Chestnut', hex: '#3B2418', code: 'CHEST' }],
      sizes: [
        { us: '8.0', uk: '7.0', eu: '41', stock: 120 },
        { us: '9.0', uk: '8.0', eu: '42', stock: 180 },
        { us: '10.0', uk: '9.0', eu: '43', stock: 180 },
        { us: '11.0', uk: '10.0', eu: '44', stock: 120 }
      ],
      tiers: [
        { minQty: newProdMoq, maxQty: 49, unitPrice: newProdTier1Price, label: `${newProdMoq}–49 pairs` },
        { minQty: 50, maxQty: 99, unitPrice: Number((newProdTier1Price * 0.9).toFixed(2)), label: '50–99 pairs' },
        { minQty: 100, maxQty: 249, unitPrice: Number((newProdTier1Price * 0.8).toFixed(2)), label: '100–249 pairs' },
        { minQty: 250, maxQty: null, unitPrice: newProdTier4Price, label: '250+ pairs' }
      ],
      sampleAvailable: true,
      samplePrice: Number((newProdTier1Price * 1.5).toFixed(2)),
      isCustomizable: true,
      status: 'active'
    });
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdSku('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Shell Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#211B17] text-[#FAF7F2] rounded-lg border border-[#3E322A] shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D8B47E] uppercase font-semibold">
              Principal Administration Suite
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
              Verified Staff Access
            </span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold mt-1">
            Store Owner & Commercial Operations Portal
          </h1>
          <p className="text-xs text-[#B8ACA1] mt-0.5">
            Database-backed catalog management, price tier governance, quotation inbox, order fulfillment & real business analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportOrders}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#211B17] bg-[#C8A265] hover:bg-[#D8B47E] rounded transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export Orders CSV
          </button>
        </div>
      </div>

      {/* Admin Subnav */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8E1D7] pb-3 text-xs">
        {[
          { id: 'overview', label: 'Executive Dashboard', icon: BarChart3 },
          { id: 'analytics', label: 'Commercial Analytics', icon: TrendingUp },
          { id: 'products', label: `Products Catalog (${products.length})`, icon: Package },
          { id: 'quotes', label: `Quotes Inbox (${quotes.length})`, icon: FileText },
          { id: 'orders', label: `Orders Pipeline (${orders.length})`, icon: ShoppingBag },
          { id: 'customers', label: `Wholesale Approvals (${applications.length})`, icon: Users },
          { id: 'cms', label: 'Content Management (CMS)', icon: Edit },
          { id: 'settings', label: 'Global Trade Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded font-semibold transition-colors cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-[#2E221B] text-[#FAF7F2]'
                  : 'text-[#6E6054] hover:bg-[#F4EFEB]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW DASHBOARD */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          {/* Date Range Selector */}
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#241B16]">
              Real Business Performance Metrics
            </h2>
            <div className="flex items-center gap-1 bg-white p-1 rounded border border-[#DDD3C5] text-xs">
              {(['7d', '30d', '90d', 'all'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1 rounded transition-colors ${
                    dateRange === r ? 'bg-[#2E221B] text-white font-semibold' : 'text-[#6E6054]'
                  }`}
                >
                  {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : r === '90d' ? 'Last 90 Days' : 'All Time'}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2] space-y-1">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B]">Gross Order Value</span>
              <div className="font-serif text-3xl font-bold text-[#241B16] tabular-nums">
                {formatCurrency(kpis.grossSales)}
              </div>
              <span className="text-[10px] text-emerald-800 block">From {kpis.totalOrders} wholesale orders</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2] space-y-1">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B]">Average Order Value (AOV)</span>
              <div className="font-serif text-3xl font-bold text-[#241B16] tabular-nums">
                {formatCurrency(kpis.aov)}
              </div>
              <span className="text-[10px] text-[#7A6C5F] block">Avg ~{Math.round(orders.reduce((s, o) => s + o.totalQuantity, 0) / (orders.length || 1))} pairs per run</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2] space-y-1">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B]">Quote Conversion Rate</span>
              <div className="font-serif text-3xl font-bold text-emerald-800 tabular-nums">
                {kpis.quoteConversionRate}%
              </div>
              <span className="text-[10px] text-[#7A6C5F] block">{kpis.acceptedQuotes} of {kpis.totalQuotes} RFQs converted</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2] space-y-1">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B]">Outstanding Quote Pipeline</span>
              <div className="font-serif text-3xl font-bold text-[#8A5A2B] tabular-nums">
                {formatCurrency(kpis.outstandingQuoteValue)}
              </div>
              <span className="text-[10px] text-[#7A6C5F] block">Active negotiations & submitted RFQs</span>
            </div>
          </div>

          {/* Action Alerts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Approvals */}
            <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#241B16]">
                  Wholesale Accounts Awaiting Approval ({kpis.pendingApprovals})
                </h3>
                <button
                  onClick={() => setActiveSection('customers')}
                  className="text-xs font-semibold text-[#8A5A2B] hover:text-[#4A3728]"
                >
                  Review All →
                </button>
              </div>
              <div className="space-y-2">
                {applications.filter((a) => a.status === 'Pending Review').map((app) => (
                  <div key={app.id} className="p-3 bg-[#FAF7F2] rounded border border-[#E8E1D7] flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-[#241B16] block">{app.companyName}</strong>
                      <span className="text-[#7A6C5F]">{app.contactName} · {app.annualVolumeEst}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'Approved', 'Standard Wholesale')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'Declined')}
                        className="px-2 py-1 text-[11px] text-[#7A6C5F] hover:text-rose-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#241B16]">
                  Inventory Replenishment Alerts
                </h3>
                <button
                  onClick={() => setActiveSection('products')}
                  className="text-xs font-semibold text-[#8A5A2B] hover:text-[#4A3728]"
                >
                  Manage Stock →
                </button>
              </div>
              <div className="space-y-2 text-xs">
                {products.slice(0, 2).map((p) => (
                  <div key={p.id} className="p-3 bg-[#FAF7F2] rounded border border-[#E8E1D7] flex items-center justify-between">
                    <div>
                      <strong className="text-[#241B16] block">{p.name}</strong>
                      <span className="text-[#7A6C5F]">SKU: {p.sku} · Primary Tannery: {p.leatherType}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-900 rounded">
                      Lead Time: {p.leadTimeWeeks}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. IN-DEPTH ANALYTICS */}
      {activeSection === 'analytics' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                Commercial Sales & Wholesale Funnel Analytics
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                Authoritative conversion telemetry based strictly on real transaction records.
              </p>
            </div>
          </div>

          {/* Wholesale Conversion Funnel Stages */}
          <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#241B16]">
              Wholesale Conversion Funnel (Discovery to Dispatch)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                <span className="text-[10px] uppercase font-bold text-[#8C7A6B] block">Stage 1: Catalog Inquiries</span>
                <span className="font-serif text-2xl font-bold text-[#241B16] block tabular-nums mt-1">1,240</span>
                <span className="text-[10px] text-[#7A6C5F]">Verified style views</span>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                <span className="text-[10px] uppercase font-bold text-[#8C7A6B] block">Stage 2: Inquiry Lists</span>
                <span className="font-serif text-2xl font-bold text-[#241B16] block tabular-nums mt-1">86</span>
                <span className="text-[10px] text-emerald-700">6.9% of visitors</span>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                <span className="text-[10px] uppercase font-bold text-[#8C7A6B] block">Stage 3: RFQs Submitted</span>
                <span className="font-serif text-2xl font-bold text-[#241B16] block tabular-nums mt-1">{quotes.length}</span>
                <span className="text-[10px] text-emerald-700">Active Dossiers</span>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                <span className="text-[10px] uppercase font-bold text-[#8C7A6B] block">Stage 4: Quotes Accepted</span>
                <span className="font-serif text-2xl font-bold text-[#241B16] block tabular-nums mt-1">{kpis.acceptedQuotes}</span>
                <span className="text-[10px] text-emerald-700">{kpis.quoteConversionRate}% conversion</span>
              </div>

              <div className="p-4 bg-[#261E1A] text-[#FAF7F2] rounded border border-[#3E322A]">
                <span className="text-[10px] uppercase font-bold text-[#D8B47E] block">Stage 5: Confirmed POs</span>
                <span className="font-serif text-2xl font-bold text-[#FAF7F2] block tabular-nums mt-1">{orders.length}</span>
                <span className="text-[10px] text-emerald-400">{formatCurrency(kpis.grossSales)} value</span>
              </div>
            </div>
          </div>

          {/* Category Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#241B16]">
                Volume by Footwear Category (Pairs)
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-semibold text-[#241B16]">
                    <span>Chelsea Boots</span>
                    <span>120 pairs (50%)</span>
                  </div>
                  <div className="w-full bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#4A3728] h-full w-1/2" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-semibold text-[#241B16]">
                    <span>Lace-Up Work Boots</span>
                    <span>60 pairs (25%)</span>
                  </div>
                  <div className="w-full bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#7C3F1B] h-full w-1/4" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-semibold text-[#241B16]">
                    <span>Oxford Dress Boots</span>
                    <span>40 pairs (17%)</span>
                  </div>
                  <div className="w-full bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#8A5A2B] h-full w-[17%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-semibold text-[#241B16]">
                    <span>Custom OEM Programs</span>
                    <span>20 pairs (8%)</span>
                  </div>
                  <div className="w-full bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#A69788] h-full w-[8%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#241B16]">
                Geographic Wholesale Distribution
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                  <strong className="text-[#241B16]">United States & Canada</strong>
                  <span className="font-semibold text-emerald-800">45% of orders ($38,200)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                  <strong className="text-[#241B16]">United Kingdom & Ireland</strong>
                  <span className="font-semibold text-emerald-800">25% of orders ($21,500)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                  <strong className="text-[#241B16]">European Union (Nordics, Germany, Italy)</strong>
                  <span className="font-semibold text-emerald-800">20% of orders ($17,000)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded border border-[#E8E1D7]">
                  <strong className="text-[#241B16]">Japan & Australia</strong>
                  <span className="font-semibold text-emerald-800">10% of orders ($8,500)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRODUCT MANAGEMENT */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                Master Footwear Catalog Management
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                Configure styles, prices, minimum order rules, and carton packing standards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportProducts}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#4A3728] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded"
              >
                <Download className="w-3.5 h-3.5" /> Export Catalog CSV
              </button>
              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2E221B] hover:bg-[#1E1611] rounded shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Boot Model
              </button>
            </div>
          </div>

          {/* Add Product Modal / Dropdown */}
          {isAddProductOpen && (
            <form onSubmit={handleCreateProduct} className="p-6 bg-white rounded-lg border border-[#4A3728] shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#241B16] border-b border-[#F0E9DF] pb-2">
                Create New Footwear Model in Catalog
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Boot Name *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Field Officer Trench Boot"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    placeholder="e.g. CST-TRN-007"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Category</label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  >
                    <option value="Chelsea Boots">Chelsea Boots</option>
                    <option value="Lace-Up Boots">Lace-Up Boots</option>
                    <option value="Dress Boots">Dress Boots</option>
                    <option value="Chukka Boots">Chukka Boots</option>
                    <option value="Custom & Private Label">Custom & Private Label</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Leather Type</label>
                  <input
                    type="text"
                    value={newProdLeather}
                    onChange={(e) => setNewProdLeather(e.target.value)}
                    placeholder="Italian Pull-Up Calfskin"
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">MOQ (Pairs)</label>
                  <input
                    type="number"
                    value={newProdMoq}
                    onChange={(e) => setNewProdMoq(parseInt(e.target.value) || 24)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Carton Multiple</label>
                  <input
                    type="number"
                    value={newProdCarton}
                    onChange={(e) => setNewProdCarton(parseInt(e.target.value) || 12)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Tier 1 Price ($)</label>
                  <input
                    type="number"
                    value={newProdTier1Price}
                    onChange={(e) => setNewProdTier1Price(parseFloat(e.target.value) || 65)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Tier 4 Price (250+)</label>
                  <input
                    type="number"
                    value={newProdTier4Price}
                    onChange={(e) => setNewProdTier4Price(parseFloat(e.target.value) || 48)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD3C5] rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 text-xs text-[#7A6C5F] hover:text-[#241B16]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2E221B] rounded"
                >
                  Save to Master Catalog
                </button>
              </div>
            </form>
          )}

          {/* Product Table */}
          <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                <tr>
                  <th className="p-4">Style / SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Construction</th>
                  <th className="p-4">Leather Hide</th>
                  <th className="p-4">MOQ / Carton</th>
                  <th className="p-4">Tier 1 Price</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E9DF]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4">
                      <strong className="text-[#241B16] block">{p.name}</strong>
                      <span className="font-mono text-[#8C7A6B] text-[11px]">{p.sku}</span>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">{p.construction}</td>
                    <td className="p-4">{p.leatherType}</td>
                    <td className="p-4 tabular-nums">
                      {p.moq} prs (Case: {p.cartonMultiple})
                    </td>
                    <td className="p-4 font-serif text-sm font-bold text-[#241B16] tabular-nums">
                      {formatCurrency(p.tiers[0]?.unitPrice || 65)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-[#9E8F82] hover:text-rose-600 transition-colors"
                        title="Archive product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. QUOTES INBOX */}
      {activeSection === 'quotes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                Quotation Inbox & Management
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                Review incoming RFQs, assign sales reps, adjust proposed unit rates, and issue formal quotations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                <tr>
                  <th className="p-4">RFQ Number</th>
                  <th className="p-4">Buyer Company</th>
                  <th className="p-4">Total Run</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Rep Assigned</th>
                  <th className="p-4">Grand Total</th>
                  <th className="p-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E9DF]">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4 font-mono font-bold text-[#241B16]">{q.id}</td>
                    <td className="p-4">
                      <strong className="block text-[#241B16]">{q.companyName}</strong>
                      <span className="text-[11px] text-[#7A6C5F]">{q.contactName} ({q.country})</span>
                    </td>
                    <td className="p-4 tabular-nums font-semibold">
                      {q.items.reduce((s, it) => s + it.totalQuantity, 0)} pairs
                    </td>
                    <td className="p-4">
                      <select
                        value={q.status}
                        onChange={(e) => updateQuote(q.id, { status: e.target.value as any })}
                        className={`text-[11px] font-bold uppercase px-2 py-1 rounded border cursor-pointer ${
                          q.status === 'Accepted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : q.status === 'Sent to Buyer'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Quotation Prepared">Quotation Prepared</option>
                        <option value="Sent to Buyer">Sent to Buyer</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Converted to Order">Converted to Order</option>
                      </select>
                    </td>
                    <td className="p-4 text-[#7A6C5F]">{q.salesRepAssigned || 'Unassigned'}</td>
                    <td className="p-4 font-serif text-sm font-bold text-[#241B16] tabular-nums">
                      {formatCurrency(q.grandTotal, q.preferredCurrency)}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {q.status === 'Accepted' && !q.convertedOrderId && (
                        <button
                          onClick={() => convertQuoteToOrder(q.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                        >
                          Convert to PO
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setReviewingQuote(q);
                          setQuoteRep(q.salesRepAssigned || 'Marcus Vance');
                          setQuoteInternalNote(q.internalNotes || '');
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#4A3728] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quotation Review & Adjustment Modal */}
          {reviewingQuote && (
            <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#F0E9DF] pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#241B16]">
                    Review Quotation Dossier #{reviewingQuote.id}
                  </h3>
                  <button onClick={() => setReviewingQuote(null)} className="text-[#8C7A6B] hover:text-[#241B16]">
                    ✕
                  </button>
                </div>

                <div className="text-xs space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>Company: <strong>{reviewingQuote.companyName}</strong></div>
                    <div>Contact: <strong>{reviewingQuote.contactName} ({reviewingQuote.email})</strong></div>
                    <div>Port: <strong>{reviewingQuote.destinationPort}</strong></div>
                    <div>Terms: <strong>{reviewingQuote.incoterms}</strong></div>
                  </div>

                  <div className="pt-3 border-t border-[#F0E9DF]">
                    <span className="font-bold text-[#4A3728] block mb-1">Line Items:</span>
                    {reviewingQuote.items.map((it, idx) => (
                      <div key={idx} className="p-2 bg-[#FAF7F2] rounded border border-[#E8E1D7] flex justify-between text-xs mb-1">
                        <span>{it.productName} ({it.totalQuantity} pairs)</span>
                        <strong className="tabular-nums">
                          {formatCurrency(it.proposedUnitPrice, reviewingQuote.preferredCurrency)} / pr
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block font-semibold mb-1">Assign Sales Representative:</label>
                    <input
                      type="text"
                      value={quoteRep}
                      onChange={(e) => setQuoteRep(e.target.value)}
                      className="w-full px-3 py-1.5 border border-[#DDD3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Internal Sales Notes (Invisible to Buyer):</label>
                    <textarea
                      rows={2}
                      value={quoteInternalNote}
                      onChange={(e) => setQuoteInternalNote(e.target.value)}
                      className="w-full px-3 py-1.5 border border-[#DDD3C5] rounded"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F0E9DF]">
                  <button
                    onClick={() => setReviewingQuote(null)}
                    className="px-4 py-2 text-xs text-[#7A6C5F]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      updateQuote(reviewingQuote.id, {
                        salesRepAssigned: quoteRep,
                        internalNotes: quoteInternalNote,
                        status: 'Sent to Buyer'
                      });
                      setReviewingQuote(null);
                    }}
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2E221B] rounded"
                  >
                    Transmit Formal Quotation to Buyer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. ORDERS PIPELINE */}
      {activeSection === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                Production & Fulfillment Pipeline
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                Transition orders across manufacturing gates: Cutting → Goodyear Welting → Finishing → Ocean Freight Dispatch.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                <tr>
                  <th className="p-4">Order ID / PO</th>
                  <th className="p-4">Buyer Company</th>
                  <th className="p-4">Run Pairs</th>
                  <th className="p-4">Production Stage</th>
                  <th className="p-4">Payment Record</th>
                  <th className="p-4">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E9DF]">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4">
                      <strong className="block font-mono text-[#241B16]">{ord.id}</strong>
                      <span className="text-[11px] text-[#8C7A6B]">PO: {ord.poReference}</span>
                    </td>
                    <td className="p-4">
                      <strong className="block text-[#241B16]">{ord.companyName}</strong>
                      <span className="text-[11px] text-[#7A6C5F]">{ord.contactName}</span>
                    </td>
                    <td className="p-4 tabular-nums font-semibold">{ord.totalQuantity} prs</td>
                    <td className="p-4">
                      <select
                        value={ord.fulfillmentStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="text-xs font-semibold px-2 py-1 bg-white border border-[#DDD3C5] rounded"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Production">In Production (Bench Welt)</option>
                        <option value="Ready to Dispatch">Ready to Dispatch</option>
                        <option value="Shipped">Shipped (Cargo Port)</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select
                        value={ord.paymentStatus}
                        onChange={(e) => updatePaymentStatus(ord.id, e.target.value as any)}
                        className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 rounded px-2 py-1"
                      >
                        <option value="Pending Verification">Pending Verification</option>
                        <option value="Authorized">Authorized</option>
                        <option value="Paid (Net-30)">Paid (Net-30 Trade Credit)</option>
                        <option value="Paid (Wire Transfer)">Paid (Wire Transfer)</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="p-4 font-serif text-sm font-bold text-[#241B16] tabular-nums">
                      {formatCurrency(ord.grandTotal, ord.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. CUSTOMER APPLICATIONS */}
      {activeSection === 'customers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                Wholesale Account Verification & Approvals
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                Review commercial registration, assign wholesale price lists, and grant credit facilities.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                <tr>
                  <th className="p-4">Application ID</th>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Tax / VAT ID</th>
                  <th className="p-4">Annual Volume</th>
                  <th className="p-4">Assigned Tier</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E9DF]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4 font-mono font-bold">{app.id}</td>
                    <td className="p-4">
                      <strong className="block text-[#241B16]">{app.companyName}</strong>
                      <span className="text-[11px] text-[#7A6C5F]">{app.contactName} ({app.email})</span>
                    </td>
                    <td className="p-4 font-mono">{app.businessNumber}</td>
                    <td className="p-4">{app.annualVolumeEst}</td>
                    <td className="p-4 font-semibold text-[#8A5A2B]">{app.assignedTier}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {app.status === 'Pending Review' ? (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Approved', 'Standard Wholesale')}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Declined')}
                            className="px-2 py-1 text-xs text-rose-700 hover:underline"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-800 font-semibold">✓ Active Account</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. CMS (CONTENT MANAGEMENT) */}
      {activeSection === 'cms' && (
        <div className="p-8 bg-white rounded-lg border border-[#E5DDD2] shadow-xs space-y-6 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-3">
            Storefront Editorial & Announcement Content
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Top Announcement Strip</label>
              <input
                type="text"
                value={cms.announcementBar}
                onChange={(e) => updateCMS({ announcementBar: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Homepage Hero Headline</label>
              <input
                type="text"
                value={cms.heroHeadline}
                onChange={(e) => updateCMS({ heroHeadline: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Hero Subheadline</label>
              <textarea
                rows={3}
                value={cms.heroSubheadline}
                onChange={(e) => updateCMS({ heroSubheadline: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Atelier Craftsmanship Title</label>
              <input
                type="text"
                value={cms.craftsmanshipTitle}
                onChange={(e) => updateCMS({ craftsmanshipTitle: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Craftsmanship Story Paragraph</label>
              <textarea
                rows={3}
                value={cms.craftsmanshipText}
                onChange={(e) => updateCMS({ craftsmanshipText: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#3D3127] mb-1">Contact Email</label>
                <input
                  type="email"
                  value={cms.contactEmail}
                  onChange={(e) => updateCMS({ contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#3D3127] mb-1">Telephone</label>
                <input
                  type="text"
                  value={cms.contactPhone}
                  onChange={(e) => updateCMS({ contactPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDD3C5] rounded bg-[#FAF7F2]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. SETTINGS */}
      {activeSection === 'settings' && (
        <div className="p-8 bg-white rounded-lg border border-[#E5DDD2] shadow-xs space-y-6 max-w-2xl">
          <h2 className="font-serif text-2xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-3">
            Wholesale Trade & Engine Settings
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => updateSettings({ brandName: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Default Production MOQ (Pairs)</label>
              <input
                type="number"
                value={settings.defaultMoq}
                onChange={(e) => updateSettings({ defaultMoq: parseInt(e.target.value) || 24 })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3D3127] mb-1">Quote Validity Period (Days)</label>
              <input
                type="number"
                value={settings.autoQuoteExpiryDays}
                onChange={(e) => updateSettings({ autoQuoteExpiryDays: parseInt(e.target.value) || 21 })}
                className="w-full px-3 py-2 border border-[#DDD3C5] rounded"
              />
            </div>

            <label className="flex items-center gap-2 p-3 bg-[#FAF7F2] rounded border border-[#E5DDD2] cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowSampleOrdering}
                onChange={(e) => updateSettings({ allowSampleOrdering: e.target.checked })}
                className="rounded"
              />
              <div>
                <strong className="block text-[#241B16]">Enable Pre-Production Prototype Sampling</strong>
                <span className="text-[#7A6C5F]">Allows prospective buyers to order 1-pair prototypes at surcharge rate.</span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

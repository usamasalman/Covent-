import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricingEngine';
import { QuoteRequest, Order } from '../../types';
import {
  Building2,
  FileText,
  ShoppingBag,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  Download,
  ExternalLink,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const BuyerPortal: React.FC = () => {
  const {
    currentUser,
    quotes,
    orders,
    acceptQuote,
    convertQuoteToOrder,
    navigateTo,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'orders' | 'company' | 'invoices'>('overview');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [buyerFeedback, setBuyerFeedback] = useState('');

  // Filter company records
  const companyQuotes = quotes.filter(
    (q) => q.email === currentUser.email || q.companyName === currentUser.companyName
  );

  const companyOrders = orders.filter(
    (o) => o.email === currentUser.email || o.companyName === currentUser.companyName
  );

  const handleAcceptQuote = (quoteId: string) => {
    acceptQuote(quoteId, buyerFeedback || 'Accepted by buyer.');
    setBuyerFeedback('');
    if (selectedQuote && selectedQuote.id === quoteId) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: 'Accepted' } : null));
    }
  };

  const handleConvertToOrder = (quoteId: string) => {
    const orderId = convertQuoteToOrder(quoteId);
    if (orderId) {
      setActiveTab('orders');
    }
  };

  const downloadCommercialInvoice = (order: Order) => {
    const invoiceData = `
======================================================
COVENT & STONE LEATHERWORKS - COMMERCIAL PROFORMA INVOICE
======================================================
Invoice / Order ID: ${order.id}
PO Reference: ${order.poReference}
Date: ${order.createdAt}
Payment Status: ${order.paymentStatus}
Payment Method: ${order.paymentMethod}

BILLED TO:
Company: ${order.companyName}
Contact: ${order.contactName} (${order.email})
Billing Address: ${order.billingAddress.line1}, ${order.billingAddress.country}

SHIP TO:
Address: ${order.shippingAddress.line1}, ${order.shippingAddress.country}
Carrier: ${order.carrier || 'Ocean Freight Carrier'}
Tracking / B/L: ${order.trackingNumber || 'Pending Dispatch Manifest'}

------------------------------------------------------
LINE ITEMS:
${order.items
  .map(
    (it) =>
      `• ${it.productName} (${it.color}) [SKU: ${it.sku}]
  Qty: ${it.totalQuantity} pairs @ ${formatCurrency(it.unitPrice, order.currency)} = ${formatCurrency(it.lineTotal, order.currency)}`
  )
  .join('\n')}

------------------------------------------------------
Subtotal: ${formatCurrency(order.subtotal, order.currency)}
Freight (Incoterms 2020): ${formatCurrency(order.shippingAmount, order.currency)}
Tax / Duty: ${formatCurrency(order.taxAmount, order.currency)}
GRAND TOTAL: ${formatCurrency(order.grandTotal, order.currency)}
======================================================
    `.trim();

    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast(`Commercial invoice for order ${order.id} downloaded.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Buyer Account Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-lg border border-[#E5DDD2] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2E221B] text-[#FAF7F2] rounded-full flex items-center justify-center font-serif text-xl font-bold">
            {currentUser.companyName?.substring(0, 2).toUpperCase() || 'BT'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#241B16]">
                {currentUser.companyName || 'Wholesale Buyer'}
              </h1>
              {currentUser.isApproved ? (
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Gold Volume Partner (-5%)
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Account Pending Review
                </span>
              )}
            </div>
            <p className="text-xs text-[#7A6C5F] mt-0.5">
              Authorized Buyer: <strong className="text-[#241B16]">{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('request-quote')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors"
          >
            New Quotation Request
          </button>
          <button
            onClick={() => navigateTo('products')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2E221B] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded transition-colors"
          >
            Browse Catalog
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8E1D7] pb-2 text-xs">
        {[
          { id: 'overview', label: 'Account Dashboard' },
          { id: 'quotes', label: `Quotations (${companyQuotes.length})` },
          { id: 'orders', label: `Production Orders (${companyOrders.length})` },
          { id: 'invoices', label: 'Commercial Invoices' },
          { id: 'company', label: 'Company Profile & Terms' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSelectedQuote(null);
              setSelectedOrder(null);
            }}
            className={`px-4 py-2 rounded font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#2E221B] text-[#FAF7F2]'
                : 'text-[#6E6054] hover:bg-[#F4EFEB]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2]">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B] block">Active RFQs</span>
              <span className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mt-1 block">
                {companyQuotes.length}
              </span>
              <span className="text-[10px] text-[#7A6C5F]">In negotiation or prepared</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2]">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B] block">Orders in Production</span>
              <span className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mt-1 block">
                {companyOrders.filter((o) => o.fulfillmentStatus === 'In Production').length}
              </span>
              <span className="text-[10px] text-[#7A6C5F]">Bench lasting & welt stitching</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2]">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B] block">Total Footwear Purchased</span>
              <span className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mt-1 block">
                {companyOrders.reduce((sum, o) => sum + o.totalQuantity, 0)} <span className="text-xs font-normal font-sans">prs</span>
              </span>
              <span className="text-[10px] text-emerald-700">All-time volume</span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#E5DDD2]">
              <span className="text-[11px] font-semibold uppercase text-[#8C7A6B] block">Approved Credit Line</span>
              <span className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mt-1 block">
                $25,000
              </span>
              <span className="text-[10px] text-[#7A6C5F]">Net-30 verified terms</span>
            </div>
          </div>

          {/* Recent Quotation Highlights */}
          <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#241B16]">
                Recent Quotation Proposals
              </h3>
              <button
                onClick={() => setActiveTab('quotes')}
                className="text-xs font-semibold text-[#8A5A2B] hover:text-[#4A3728]"
              >
                View All Quotes →
              </button>
            </div>

            <div className="space-y-3">
              {companyQuotes.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuote(q);
                    setActiveTab('quotes');
                  }}
                  className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7] hover:border-[#4A3728] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <strong className="text-sm text-[#241B16]">{q.id}</strong>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        q.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.status === 'Sent to Buyer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6C5F] mt-1">
                      {q.items.map((it) => `${it.productName} (${it.totalQuantity} prs)`).join(', ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#241B16] tabular-nums block">
                      {formatCurrency(q.grandTotal, q.preferredCurrency)}
                    </span>
                    <span className="text-[10px] text-[#8C7A6B]">Target: {q.targetDeliveryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          {selectedQuote ? (
            /* Detailed Quote View */
            <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0E9DF] pb-4">
                <div>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="text-xs text-[#8A5A2B] hover:text-[#4A3728] font-semibold mb-2 block"
                  >
                    ← Back to Quotes Inbox
                  </button>
                  <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                    Quotation #{selectedQuote.id}
                  </h2>
                  <p className="text-xs text-[#7A6C5F]">
                    Issued on {selectedQuote.createdAt} · Valid until {selectedQuote.validUntil}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded inline-block mb-1 ${
                    selectedQuote.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedQuote.status}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#241B16] block tabular-nums">
                    {formatCurrency(selectedQuote.grandTotal, selectedQuote.preferredCurrency)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A3728] block">
                  Quoted Production Styles:
                </span>
                {selectedQuote.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7] flex items-center justify-between">
                    <div>
                      <strong className="text-sm text-[#241B16] block">{item.productName} ({item.color})</strong>
                      <span className="text-xs text-[#7A6C5F]">
                        SKU: {item.sku} · Customization: {item.customBrandingNote || 'Standard branding'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#241B16] block tabular-nums">
                        {item.totalQuantity} pairs @ {formatCurrency(item.proposedUnitPrice, selectedQuote.preferredCurrency)}
                      </span>
                      <span className="text-xs text-[#7A6C5F] tabular-nums">
                        Line: {formatCurrency(item.lineTotal, selectedQuote.preferredCurrency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terms breakdown */}
              <div className="p-4 bg-[#F4EFEB] rounded border border-[#DDD3C5] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>Port: <strong className="text-[#241B16] block">{selectedQuote.destinationPort}</strong></div>
                <div>Incoterms: <strong className="text-[#241B16] block">{selectedQuote.incoterms}</strong></div>
                <div>Subtotal: <strong className="text-[#241B16] block tabular-nums">{formatCurrency(selectedQuote.subtotal, selectedQuote.preferredCurrency)}</strong></div>
                <div>Freight: <strong className="text-[#241B16] block tabular-nums">{formatCurrency(selectedQuote.estimatedFreight, selectedQuote.preferredCurrency)}</strong></div>
              </div>

              {/* Buyer Actions */}
              {selectedQuote.status === 'Sent to Buyer' && (
                <div className="p-4 bg-emerald-50 rounded border border-emerald-200 space-y-3">
                  <strong className="text-xs font-bold text-emerald-950 block">
                    Accept Quotation & Initiate Purchase Order
                  </strong>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    By accepting, you lock in the proposed unit rates and assign this batch to our upcoming production schedule.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptQuote(selectedQuote.id)}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-900 rounded transition-colors"
                    >
                      Accept Formal Quotation
                    </button>
                    <button
                      onClick={() => addToast('Sales representative alerted for quotation revision.', 'info')}
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A3728] bg-white border border-[#DDD3C5] rounded"
                    >
                      Request Modification
                    </button>
                  </div>
                </div>
              )}

              {selectedQuote.status === 'Accepted' && !selectedQuote.convertedOrderId && (
                <div className="p-4 bg-blue-50 rounded border border-blue-200 space-y-3">
                  <strong className="text-xs font-bold text-blue-950 block">
                    Quotation Accepted · Ready to Issue Formal Purchase Order
                  </strong>
                  <p className="text-xs text-blue-900">
                    Generate the formal production order and commercial proforma invoice.
                  </p>
                  <button
                    onClick={() => handleConvertToOrder(selectedQuote.id)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2E221B] hover:bg-[#1E1611] rounded"
                  >
                    Generate Official Production Order
                  </button>
                </div>
              )}

              {selectedQuote.convertedOrderId && (
                <div className="p-4 bg-purple-50 rounded border border-purple-200 text-xs text-purple-950 flex items-center justify-between">
                  <span>Converted into Production Order <strong>{selectedQuote.convertedOrderId}</strong></span>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="font-semibold underline text-purple-900"
                  >
                    View in Orders →
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quotes Table */
            <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                  <tr>
                    <th className="p-4">RFQ Number</th>
                    <th className="p-4">Requested Styles</th>
                    <th className="p-4">Total Pairs</th>
                    <th className="p-4">Incoterms</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Grand Total</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E9DF]">
                  {companyQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="p-4 font-mono font-bold text-[#241B16]">{q.id}</td>
                      <td className="p-4 max-w-xs truncate">{q.items.map((i) => i.productName).join(', ')}</td>
                      <td className="p-4 tabular-nums font-semibold">{q.items.reduce((s, i) => s + i.totalQuantity, 0)}</td>
                      <td className="p-4">{q.incoterms} ({q.destinationPort})</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          q.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.status === 'Sent to Buyer'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="p-4 font-serif text-sm font-bold text-[#241B16] tabular-nums">
                        {formatCurrency(q.grandTotal, q.preferredCurrency)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="px-3 py-1 text-xs font-semibold text-[#8A5A2B] hover:text-[#4A3728] underline"
                        >
                          Review & Act
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E1D7] text-[#7A6C5F] uppercase font-semibold">
                <tr>
                  <th className="p-4">Order ID / PO</th>
                  <th className="p-4">Items / Pairs</th>
                  <th className="p-4">Fulfillment Stage</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4 text-right">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E9DF]">
                {companyOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4">
                      <strong className="block font-mono text-[#241B16]">{order.id}</strong>
                      <span className="text-[11px] text-[#8C7A6B]">PO: {order.poReference}</span>
                    </td>
                    <td className="p-4">
                      <strong className="block text-[#241B16]">{order.totalQuantity} pairs</strong>
                      <span className="text-[11px] text-[#7A6C5F]">
                        {order.items.map((i) => i.productName).join(', ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                        <Truck className="w-3.5 h-3.5" /> {order.fulfillmentStatus}
                      </span>
                      {order.trackingNumber && (
                        <span className="block text-[10px] font-mono text-[#7A6C5F] mt-1">
                          Tracking: {order.trackingNumber}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-emerald-800 block">{order.paymentStatus}</span>
                      <span className="text-[10px] text-[#7A6C5F]">{order.paymentMethod}</span>
                    </td>
                    <td className="p-4 font-serif text-sm font-bold text-[#241B16] tabular-nums">
                      {formatCurrency(order.grandTotal, order.currency)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => downloadCommercialInvoice(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#241B16] bg-[#F4EFEB] hover:bg-[#EAE2D7] rounded transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Invoice (.txt)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#241B16]">
            Exportable Commercial Proforma Invoices
          </h3>
          <p className="text-xs text-[#6B5D52]">
            Authoritative proforma documents containing packing lists, incoterms, and wire routing details.
          </p>

          <div className="space-y-3">
            {companyOrders.map((ord) => (
              <div key={ord.id} className="p-4 bg-[#FAF7F2] rounded border border-[#E8E1D7] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-sm font-mono text-[#241B16] block">Proforma {ord.id}</strong>
                  <span className="text-[#7A6C5F]">PO: {ord.poReference} · Issued {ord.createdAt}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-base font-bold text-[#241B16] tabular-nums">
                    {formatCurrency(ord.grandTotal, ord.currency)}
                  </span>
                  <button
                    onClick={() => downloadCommercialInvoice(ord)}
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded hover:bg-[#1E1611]"
                  >
                    Download Proforma
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="p-8 bg-white rounded-lg border border-[#E5DDD2] space-y-6 max-w-3xl">
          <h3 className="font-serif text-xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-3">
            Corporate Trade Profile & Credit Tier
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>Company: <strong className="text-[#241B16] block">{currentUser.companyName}</strong></div>
            <div>Tax ID / VAT: <strong className="text-[#241B16] block">US 91-4401928</strong></div>
            <div>Authorized Buyer: <strong className="text-[#241B16] block">{currentUser.name}</strong></div>
            <div>Corporate Email: <strong className="text-[#241B16] block">{currentUser.email}</strong></div>
            <div>Direct Telephone: <strong className="text-[#241B16] block">{currentUser.phone}</strong></div>
            <div>Credit Line: <strong className="text-[#241B16] block">$25,000 (Net-30)</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};

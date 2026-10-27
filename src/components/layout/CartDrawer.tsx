import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, validateCartonMultiple, calculateCartSummary } from '../../utils/pricingEngine';
import { X, Trash2, ArrowRight, ShieldCheck, Box, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { ContainerLoadBar } from '../cart/ContainerLoadBar';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    navigateTo,
    createDirectOrder,
    currentUser,
    addToast
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'direct_checkout'>('cart');
  const [poReference, setPoReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Wire Transfer / T/T' | 'Net-30 Trade Credit'>('Wire Transfer / T/T');
  const [shippingDest, setShippingDest] = useState('1420 5th Avenue, Suite 1200, Seattle, WA 98101, United States');

  if (!isCartOpen) return null;

  const summary = calculateCartSummary(cart);

  const handleProceedToQuote = () => {
    setIsCartOpen(false);
    navigateTo('request-quote');
  };

  const handleDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.allMeetMoq) {
      addToast('All styles must meet their Minimum Order Quantity (MOQ) before direct order submission.', 'error');
      return;
    }

    const orderId = createDirectOrder({
      poReference: poReference || `PO-${Date.now().toString().slice(-4)}`,
      companyName: currentUser.companyName || 'Wholesale Buyer Inc.',
      contactName: currentUser.name,
      email: currentUser.email,
      shippingAddress: {
        line1: shippingDest,
        city: 'Destination Port / Warehouse',
        state: 'N/A',
        postalCode: '98101',
        country: 'United States'
      },
      billingAddress: {
        line1: shippingDest,
        city: 'Destination Port / Warehouse',
        state: 'N/A',
        postalCode: '98101',
        country: 'United States'
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        color: item.selectedColor.name,
        assortment: item.assortment.map((a) => ({ size: a.sizeUs, quantity: a.quantity })),
        totalQuantity: item.totalQuantity,
        unitPrice: item.unitPrice,
        lineTotal: item.subtotal
      })),
      totalQuantity: summary.totalPairs,
      subtotal: summary.subtotal,
      shippingAmount: Number((summary.totalPairs * 3.5).toFixed(2)),
      taxAmount: 0,
      grandTotal: Number((summary.subtotal + summary.totalPairs * 3.5).toFixed(2)),
      currency: 'USD',
      paymentStatus: paymentMethod === 'Net-30 Trade Credit' ? 'Paid (Net-30)' : 'Pending Verification',
      paymentMethod,
      carrier: 'Ocean Freight / Forwarder'
    });

    setIsCartOpen(false);
    setCheckoutStep('cart');
    navigateTo('account');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E5DDD2]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E0D5] flex items-center justify-between bg-[#F4EFEB]">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241B16]">
                {checkoutStep === 'cart' ? 'Wholesale Inquiry & Purchasing List' : 'Direct Wholesale Checkout'}
              </h2>
              <p className="text-xs text-[#7A6C5F] mt-0.5">
                {cart.length} style{cart.length === 1 ? '' : 's'} · {summary.totalPairs} total pairs · {summary.estimatedCartons} cartons
              </p>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutStep('cart');
              }}
              className="p-2 text-[#7A6C5F] hover:text-[#241B16] rounded-md transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Box className="w-12 h-12 text-[#B8ACA1] mx-auto" />
                <h3 className="font-serif text-xl font-semibold text-[#2E241E]">
                  Your wholesale list is empty
                </h3>
                <p className="text-xs text-[#7E7065] max-w-xs mx-auto">
                  Browse our master catalog of handcrafted Goodyear-welted boots to assemble your seasonal bulk order or quote request.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-colors"
                >
                  Explore Master Catalog
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <div className="space-y-6">
                {cart.map((item) => {
                  const cartonCheck = validateCartonMultiple(item.totalQuantity, item.product.cartonMultiple);
                  const isBelowMoq = item.totalQuantity < item.product.moq;

                  return (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-lg border border-[#E8E0D5] shadow-xs space-y-3"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded bg-[#F4EFEB] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-semibold text-[#241C16] truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-[#7A6C5F]">
                                SKU: {item.product.sku} · Color: <span className="font-medium text-[#241C16]">{item.selectedColor.name}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#9E8F82] hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove style from cart"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-2 flex items-baseline gap-3">
                            <span className="text-sm font-bold text-[#241C16] tabular-nums">
                              {formatCurrency(item.unitPrice)} / pair
                            </span>
                            <span className="text-xs text-[#7A6C5F]">
                              Subtotal: <strong className="text-[#241C16] tabular-nums">{formatCurrency(item.subtotal)}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Size Assortment Matrix Breakdown */}
                      <div className="pt-2 border-t border-[#F0E9DF]">
                        <span className="text-[11px] font-semibold text-[#5A4D42] uppercase tracking-wider block mb-1.5">
                          Size Assortment Matrix (US):
                        </span>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {item.assortment.map((asst, idx) => (
                            <div key={asst.sizeUs} className="text-center p-1.5 bg-[#FAF7F2] rounded border border-[#EAE3DA]">
                              <span className="text-[10px] text-[#7A6C5F] block font-mono">
                                US {asst.sizeUs}
                              </span>
                              <input
                                type="number"
                                min="0"
                                value={asst.quantity}
                                onChange={(e) =>
                                  updateCartItemQuantity(item.id, idx, parseInt(e.target.value) || 0)
                                }
                                className="w-full text-center text-xs font-semibold text-[#241C16] bg-transparent focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Validation Notices */}
                      <div className="pt-2 flex flex-col gap-1 text-[11px]">
                        {isBelowMoq && (
                          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              Below MOQ ({item.product.moq} pairs). Please increase quantity or request custom sample.
                            </span>
                          </div>
                        )}
                        {!cartonCheck.isValid && (
                          <div className="flex items-center gap-1.5 text-[#735A42] bg-[#F4EFEB] px-2.5 py-1 rounded border border-[#DDD3C6]">
                            <Box className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              Case rule: {item.product.cartonMultiple} pairs/carton. Suggest rounding to {cartonCheck.recommendedQuantity} pairs ({cartonCheck.cartons} cartons).
                            </span>
                          </div>
                        )}
                        {!isBelowMoq && cartonCheck.isValid && (
                          <div className="flex items-center gap-1.5 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Optimal packing: {cartonCheck.cartons} full shipping cartons.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#8C7A6B] hover:text-[#2E241E] underline"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            ) : (
              /* Direct Wholesale Checkout Form */
              <form onSubmit={handleDirectOrder} className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
                  <strong>Notice:</strong> This submits a formal wholesale purchase order. Commercial proforma invoice will be dispatched immediately.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Buyer Purchase Order (PO) Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={poReference}
                    onChange={(e) => setPoReference(e.target.value)}
                    placeholder="e.g. PO-2026-US-891"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Destination Port / Warehouse Address *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={shippingDest}
                    onChange={(e) => setShippingDest(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Payment Terms
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2.5 bg-white border border-[#D5C9BB] rounded cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Wire Transfer / T/T'}
                        onChange={() => setPaymentMethod('Wire Transfer / T/T')}
                      />
                      <div className="text-xs">
                        <span className="font-semibold block text-[#241C16]">
                          Wire Transfer / T/T (30% deposit, 70% before bill of lading)
                        </span>
                        <span className="text-[#7A6C5F]">Standard international commercial terms</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-white border border-[#D5C9BB] rounded cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Net-30 Trade Credit'}
                        onChange={() => setPaymentMethod('Net-30 Trade Credit')}
                      />
                      <div className="text-xs">
                        <span className="font-semibold block text-[#241C16]">
                          Net-30 Trade Credit (Approved accounts only)
                        </span>
                        <span className="text-[#7A6C5F]">Billed upon dispatch with 30-day term</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A3728] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded transition-colors"
                  >
                    Back to List
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2E221B] hover:bg-[#1C1510] rounded transition-colors"
                  >
                    Confirm PO Order
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Totals & Action */}
          {cart.length > 0 && checkoutStep === 'cart' && (
            <div className="p-6 border-t border-[#E8E0D5] bg-[#F4EFEB] space-y-4">
              {/* Freight Container Utilization Indicator */}
              <ContainerLoadBar totalPairs={summary.totalPairs} />

              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-[#685A4E]">
                  <span>Total Footwear Pairs:</span>
                  <span className="font-semibold text-[#241C16] tabular-nums">{summary.totalPairs} pairs</span>
                </div>
                <div className="flex justify-between text-[#685A4E]">
                  <span>Estimated Shipping Cartons:</span>
                  <span className="font-semibold text-[#241C16] tabular-nums">{summary.estimatedCartons} cartons</span>
                </div>
                <div className="flex justify-between text-[#685A4E]">
                  <span>Freight Estimate (Incoterms FOB):</span>
                  <span className="font-semibold text-[#241C16] tabular-nums">{formatCurrency(summary.totalPairs * 3.5)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#241C16] pt-2 border-t border-[#E0D6C8]">
                  <span>Estimated Goods Subtotal:</span>
                  <span className="tabular-nums font-serif text-lg">{formatCurrency(summary.subtotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToQuote}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#D3B27D]" />
                  <span>Request Customized Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </button>

                <button
                  onClick={() => setCheckoutStep('direct_checkout')}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3D3026] bg-white hover:bg-[#FDFBF7] border border-[#D5C9BB] rounded-md transition-colors text-center"
                >
                  Direct Wholesale PO Checkout
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C7A6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tiered wholesale discounts applied automatically. No consumer markups.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

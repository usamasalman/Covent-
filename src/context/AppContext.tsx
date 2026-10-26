import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuoteRequest, Order, CustomerApplication, CMSContent, SiteSettings, CartItem, UserAccount } from '../types';
import { INITIAL_PRODUCTS, INITIAL_QUOTES, INITIAL_ORDERS, INITIAL_APPLICATIONS, DEFAULT_CMS, DEFAULT_SETTINGS } from '../data/catalog';
import { calculateTierPrice, calculateCartSummary } from '../utils/pricingEngine';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation & Route
  currentRoute: string;
  routeParam?: string;
  navigateTo: (route: string, param?: string) => void;

  // Active Session
  currentUser: UserAccount;
  switchUserRole: (role: 'guest' | 'buyer' | 'admin') => void;

  // Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart / Bulk Purchasing List
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'subtotal' | 'unitPrice'>) => void;
  updateCartItemQuantity: (id: string, sizeIndex: number, newQty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Quotes
  quotes: QuoteRequest[];
  submitQuoteRequest: (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt' | 'subtotal' | 'estimatedFreight' | 'grandTotal' | 'status'>) => string;
  updateQuote: (id: string, updates: Partial<QuoteRequest>) => void;
  acceptQuote: (id: string, buyerNote?: string) => void;
  convertQuoteToOrder: (quoteId: string) => string;

  // Orders
  orders: Order[];
  createDirectOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'fulfillmentStatus'>) => string;
  updateOrderStatus: (id: string, status: Order['fulfillmentStatus'], trackingNumber?: string) => void;
  updatePaymentStatus: (id: string, paymentStatus: Order['paymentStatus']) => void;

  // Wholesale Applications
  applications: CustomerApplication[];
  submitApplication: (appData: Omit<CustomerApplication, 'id' | 'createdAt' | 'status' | 'assignedTier'>) => void;
  updateApplicationStatus: (id: string, status: CustomerApplication['status'], tier?: CustomerApplication['assignedTier']) => void;

  // CMS & Settings
  cms: CMSContent;
  updateCMS: (updates: Partial<CMSContent>) => void;
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Parse initial route from hash
  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { route: 'home', param: undefined };
    const parts = hash.split('/');
    return { route: parts[0] || 'home', param: parts.slice(1).join('/') || undefined };
  };

  const initialParsed = parseHash();
  const [currentRoute, setCurrentRoute] = useState<string>(initialParsed.route);
  const [routeParam, setRouteParam] = useState<string | undefined>(initialParsed.param);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const { route, param } = parseHash();
      setCurrentRoute(route);
      setRouteParam(param);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string, param?: string) => {
    setCurrentRoute(route);
    setRouteParam(param);
    const newHash = param ? `#/${route}/${param}` : `#/${route}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Accounts
  const demoBuyer: UserAccount = {
    id: 'usr-buyer-01',
    name: 'Eleanor Vance',
    email: 'procurement@beaconandtimber.com',
    role: 'buyer_owner',
    companyName: 'Beacon & Timber Supply Co.',
    phone: '+1 (503) 891-3312',
    isApproved: true
  };

  const demoAdmin: UserAccount = {
    id: 'usr-admin-01',
    name: 'Marcus Vance',
    email: 'marcus@coventstone.com',
    role: 'super_admin',
    companyName: 'Covent & Stone Atelier',
    phone: '+1 (212) 890-4420',
    isApproved: true
  };

  const demoGuest: UserAccount = {
    id: 'usr-guest-01',
    name: 'Wholesale Trade Guest',
    email: 'guest@retailer.com',
    role: 'buyer_procurement',
    isApproved: false
  };

  const [currentUser, setCurrentUser] = useState<UserAccount>(demoBuyer);

  const switchUserRole = (role: 'guest' | 'buyer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(demoAdmin);
      addToast('Switched session to Store Administrator (Marcus Vance)', 'info');
    } else if (role === 'buyer') {
      setCurrentUser(demoBuyer);
      addToast('Switched session to Wholesale Buyer (Eleanor Vance - Beacon & Timber)', 'info');
    } else {
      setCurrentUser(demoGuest);
      addToast('Switched session to Prospective Wholesale Visitor', 'info');
    }
  };

  // State entities
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [applications, setApplications] = useState<CustomerApplication[]>(INITIAL_APPLICATIONS);
  const [cms, setCms] = useState<CMSContent>(DEFAULT_CMS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Product "${newProduct.name}" added successfully.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product specifications updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from active catalog.');
  };

  // Cart actions
  const addToCart = (itemData: Omit<CartItem, 'id' | 'subtotal' | 'unitPrice'>) => {
    const discount = currentUser.isApproved ? 5 : 0;
    const tierResult = calculateTierPrice(itemData.product, itemData.totalQuantity, discount);
    const unitPrice = tierResult.unitPrice;
    const subtotal = Number((unitPrice * itemData.totalQuantity).toFixed(2));

    const newItem: CartItem = {
      ...itemData,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      unitPrice,
      subtotal
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    addToast(`Added ${itemData.totalQuantity} pairs of ${itemData.product.name} to inquiry cart.`);
  };

  const updateCartItemQuantity = (cartItemId: string, sizeIndex: number, newQty: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== cartItemId) return item;
        const newAssortment = [...item.assortment];
        newAssortment[sizeIndex] = {
          ...newAssortment[sizeIndex],
          quantity: Math.max(0, newQty)
        };
        const totalQuantity = newAssortment.reduce((acc, curr) => acc + curr.quantity, 0);
        const discount = currentUser.isApproved ? 5 : 0;
        const tierResult = calculateTierPrice(item.product, totalQuantity, discount);
        const unitPrice = tierResult.unitPrice;
        const subtotal = Number((unitPrice * totalQuantity).toFixed(2));

        return {
          ...item,
          assortment: newAssortment,
          totalQuantity,
          unitPrice,
          subtotal
        };
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    addToast('Item removed from inquiry cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Quotation actions
  const submitQuoteRequest = (
    quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt' | 'subtotal' | 'estimatedFreight' | 'grandTotal' | 'status'>
  ): string => {
    const id = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    let subtotal = 0;
    let totalPairs = 0;
    for (const item of quoteData.items) {
      subtotal += item.lineTotal;
      totalPairs += item.totalQuantity;
    }
    const estimatedFreight = Number((totalPairs * 3.5).toFixed(2));
    const grandTotal = Number((subtotal + estimatedFreight).toFixed(2));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newQuote: QuoteRequest = {
      ...quoteData,
      id,
      subtotal,
      estimatedFreight,
      grandTotal,
      status: 'New',
      createdAt: now,
      updatedAt: now,
      validUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setQuotes((prev) => [newQuote, ...prev]);
    addToast(`Bulk quotation request ${id} submitted! Our sales desk is reviewing it.`, 'success');
    return id;
  };

  const updateQuote = (id: string, updates: Partial<QuoteRequest>) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const updated = {
          ...q,
          ...updates,
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        return updated;
      })
    );
    addToast(`Quotation ${id} updated successfully.`, 'info');
  };

  const acceptQuote = (id: string, buyerNote?: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: 'Accepted',
              buyerFeedback: buyerNote || 'Accepted by buyer in portal.',
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : q
      )
    );
    addToast(`Quotation ${id} accepted! Ready to generate purchase order.`, 'success');
  };

  const convertQuoteToOrder = (quoteId: string): string => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote) return '';

    const orderId = `ORD-2026-${Math.floor(4000 + Math.random() * 5000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newOrder: Order = {
      id: orderId,
      poReference: `PO-${quote.companyName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      quoteReference: quote.id,
      companyName: quote.companyName,
      contactName: quote.contactName,
      email: quote.email,
      shippingAddress: {
        line1: 'Port of Delivery: ' + quote.destinationPort,
        city: quote.country,
        state: 'N/A',
        postalCode: '00000',
        country: quote.country
      },
      billingAddress: {
        line1: 'Corporate HQ',
        city: quote.country,
        state: 'N/A',
        postalCode: '00000',
        country: quote.country
      },
      items: quote.items.map((qi) => ({
        productId: qi.productId,
        productName: qi.productName,
        sku: qi.sku,
        color: qi.color,
        assortment: qi.assortment,
        totalQuantity: qi.totalQuantity,
        unitPrice: qi.proposedUnitPrice,
        lineTotal: qi.lineTotal
      })),
      totalQuantity: quote.items.reduce((acc, curr) => acc + curr.totalQuantity, 0),
      subtotal: quote.subtotal,
      shippingAmount: quote.estimatedFreight,
      taxAmount: 0,
      grandTotal: quote.grandTotal,
      currency: quote.preferredCurrency,
      paymentStatus: 'Authorized',
      paymentMethod: 'Wire Transfer / T/T',
      fulfillmentStatus: 'Confirmed',
      createdAt: now,
      updatedAt: now
    };

    setOrders((prev) => [newOrder, ...prev]);
    updateQuote(quoteId, { status: 'Converted to Order', convertedOrderId: orderId });
    addToast(`Quote ${quoteId} converted into Order ${orderId}!`, 'success');
    return orderId;
  };

  // Direct wholesale order
  const createDirectOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'fulfillmentStatus'>
  ): string => {
    const id = `ORD-2026-${Math.floor(4000 + Math.random() * 5000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newOrder: Order = {
      ...orderData,
      id,
      fulfillmentStatus: 'Submitted',
      createdAt: now,
      updatedAt: now
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Wholesale order ${id} received! A commercial proforma invoice has been created.`, 'success');
    return id;
  };

  const updateOrderStatus = (
    id: string,
    status: Order['fulfillmentStatus'],
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              fulfillmentStatus: status,
              ...(trackingNumber ? { trackingNumber } : {}),
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : o
      )
    );
    addToast(`Order ${id} status updated to: ${status}.`, 'info');
  };

  const updatePaymentStatus = (id: string, paymentStatus: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              paymentStatus,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : o
      )
    );
    addToast(`Order ${id} payment status recorded as: ${paymentStatus}.`, 'info');
  };

  // Wholesale applications
  const submitApplication = (
    appData: Omit<CustomerApplication, 'id' | 'createdAt' | 'status' | 'assignedTier'>
  ) => {
    const id = `APP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newApp: CustomerApplication = {
      ...appData,
      id,
      status: 'Pending Review',
      assignedTier: 'Standard Wholesale',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast(`Wholesale account application submitted! Application ID: ${id}.`, 'success');
  };

  const updateApplicationStatus = (
    id: string,
    status: CustomerApplication['status'],
    tier?: CustomerApplication['assignedTier']
  ) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              ...(tier ? { assignedTier: tier } : {})
            }
          : a
      )
    );
    addToast(`Wholesale application ${id} marked as ${status}.`, 'info');
  };

  const updateCMS = (updates: Partial<CMSContent>) => {
    setCms((prev) => ({ ...prev, ...updates }));
    addToast('Site editorial content and announcement saved.', 'success');
  };

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addToast('Global wholesale configuration updated.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParam,
        navigateTo,
        currentUser,
        switchUserRole,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        quotes,
        submitQuoteRequest,
        updateQuote,
        acceptQuote,
        convertQuoteToOrder,
        orders,
        createDirectOrder,
        updateOrderStatus,
        updatePaymentStatus,
        applications,
        submitApplication,
        updateApplicationStatus,
        cms,
        updateCMS,
        settings,
        updateSettings,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

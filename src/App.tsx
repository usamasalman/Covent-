import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ToastContainer } from './components/layout/ToastContainer';

import { HomePage } from './components/storefront/HomePage';
import { ProductCatalogPage } from './components/storefront/ProductCatalogPage';
import { ProductDetailPage } from './components/storefront/ProductDetailPage';
import { CategoryPage } from './components/storefront/CategoryPage';
import { QuoteRequestPage } from './components/storefront/QuoteRequestPage';
import { WholesaleProgramPage } from './components/storefront/WholesaleProgramPage';
import { CustomManufacturingPage } from './components/storefront/CustomManufacturingPage';
import { AboutPage } from './components/storefront/AboutPage';
import { ContactPage } from './components/storefront/ContactPage';
import { HelpCenterPage } from './components/storefront/HelpCenterPage';
import { LegalPolicyPage } from './components/storefront/LegalPolicyPage';

import { BuyerPortal } from './components/buyer/BuyerPortal';
import { AdminPortal } from './components/admin/AdminPortal';

const AppRouter: React.FC = () => {
  const { currentRoute, routeParam } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'products':
        if (routeParam) {
          return <ProductDetailPage />;
        }
        return <ProductCatalogPage />;
      case 'category':
        return <CategoryPage />;
      case 'wholesale':
        return <WholesaleProgramPage />;
      case 'custom-manufacturing':
        return <CustomManufacturingPage />;
      case 'request-quote':
        return <QuoteRequestPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'help':
        return <HelpCenterPage />;
      case 'legal':
        return <LegalPolicyPage />;
      case 'account':
        return <BuyerPortal />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1E1B18] selection:bg-[#4A3728] selection:text-[#FAF7F2]">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

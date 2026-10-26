import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, ChevronDown, User, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, cart, setIsCartOpen, currentUser, switchUserRole, cms } = useApp();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartTotalPairs = cart.reduce((acc, curr) => acc + curr.totalQuantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      {/* Announcement Bar */}
      {cms.announcementBar && (
        <div className="bg-[#241B16] text-[#E0D5C7] text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3">
          <span>{cms.announcementBar}</span>
          <button
            onClick={() => navigateTo('wholesale')}
            className="text-[#D3B27D] hover:underline inline-flex items-center gap-0.5 font-semibold text-[11px]"
          >
            Apply for Terms <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#211B17] group-hover:text-[#4A3728] transition-colors whitespace-nowrap">
                COVENT & STONE
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#887869] font-medium -mt-1">
                Heritage Footwear & Wholesale
              </span>
            </button>
          </div>

          {/* Zone 2: Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#4D4238]">
            <button
              onClick={() => navigateTo('products')}
              className={`hover:text-[#1F1915] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentRoute === 'products' ? 'text-[#1F1915] font-semibold border-b border-[#211B17]' : ''
              }`}
            >
              Master Catalog
            </button>
            <button
              onClick={() => navigateTo('custom-manufacturing')}
              className={`hover:text-[#1F1915] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentRoute === 'custom-manufacturing' ? 'text-[#1F1915] font-semibold border-b border-[#211B17]' : ''
              }`}
            >
              OEM & Private Label
            </button>
            <button
              onClick={() => navigateTo('wholesale')}
              className={`hover:text-[#1F1915] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentRoute === 'wholesale' ? 'text-[#1F1915] font-semibold border-b border-[#211B17]' : ''
              }`}
            >
              Wholesale Program
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#1F1915] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentRoute === 'about' ? 'text-[#1F1915] font-semibold border-b border-[#211B17]' : ''
              }`}
            >
              Atelier & Craft
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#1F1915] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentRoute === 'contact' ? 'text-[#1F1915] font-semibold border-b border-[#211B17]' : ''
              }`}
            >
              Trade Desk
            </button>
          </nav>

          {/* Zone 3: Actions & Workspace Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* User Session Switcher (for evaluating Buyer vs Admin vs Visitor flows) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#40342B] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded-md transition-colors border border-[#DDD3C4]"
                aria-label="Switch User Mode"
              >
                {currentUser.role === 'super_admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A5A2B]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#5F4E40]" />
                )}
                <span className="font-medium hidden sm:inline">
                  {currentUser.role === 'super_admin'
                    ? 'Admin Portal'
                    : currentUser.isApproved
                    ? 'Eleanor (Buyer)'
                    : 'Guest Trade'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#7E6D5F]" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] rounded-lg shadow-xl border border-[#E0D6C8] py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-[#EDE6DC] text-xs text-[#7A6C5F]">
                    Simulate Roles:
                  </div>
                  <button
                    onClick={() => {
                      switchUserRole('admin');
                      setIsRoleDropdownOpen(false);
                      navigateTo('admin');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F0E9DF] flex items-center justify-between text-[#241C16]"
                  >
                    <span>Store Administrator</span>
                    <span className="text-[10px] text-[#8C6439] font-semibold">Admin Panel</span>
                  </button>
                  <button
                    onClick={() => {
                      switchUserRole('buyer');
                      setIsRoleDropdownOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F0E9DF] flex items-center justify-between text-[#241C16]"
                  >
                    <span>Approved Wholesale Buyer</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Tier Partner</span>
                  </button>
                  <button
                    onClick={() => {
                      switchUserRole('guest');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#F0E9DF] flex items-center justify-between text-[#241C16]"
                  >
                    <span>New Trade Visitor</span>
                    <span className="text-[10px] text-[#7A6C5F]">Public View</span>
                  </button>
                  <div className="border-t border-[#EDE6DC] mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        navigateTo(currentUser.role === 'super_admin' ? 'admin' : 'account');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#4A3728] hover:bg-[#F0E9DF] font-medium"
                    >
                      {currentUser.role === 'super_admin' ? 'Open Admin Control' : 'Open Buyer Portal'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart / Inquiry Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#302620] hover:text-[#140E0A] hover:bg-[#EFE9DF] rounded-md transition-colors"
              aria-label={`Inquiry Cart with ${cartTotalPairs} pairs`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalPairs > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#241B16] text-[#FBF9F5] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {cartTotalPairs}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => navigateTo('request-quote')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Request Bulk Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#302620] hover:bg-[#EFE9DF] rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE3D9] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              navigateTo('products');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2E221B] border-b border-[#ECE4DA]"
          >
            Master Catalog
          </button>
          <button
            onClick={() => {
              navigateTo('custom-manufacturing');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2E221B] border-b border-[#ECE4DA]"
          >
            OEM & Private Label
          </button>
          <button
            onClick={() => {
              navigateTo('wholesale');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2E221B] border-b border-[#ECE4DA]"
          >
            Wholesale Program & Terms
          </button>
          <button
            onClick={() => {
              navigateTo('about');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2E221B] border-b border-[#ECE4DA]"
          >
            Atelier & Craftsmanship
          </button>
          <button
            onClick={() => {
              navigateTo('contact');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2E221B] border-b border-[#ECE4DA]"
          >
            Trade Desk & Showroom
          </button>
          <button
            onClick={() => {
              navigateTo(currentUser.role === 'super_admin' ? 'admin' : 'account');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-[#8C5D30]"
          >
            {currentUser.role === 'super_admin' ? 'Administrative Portal' : 'Buyer Account Dashboard'}
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                navigateTo('request-quote');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded-md"
            >
              Request Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

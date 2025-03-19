import React from 'react';
import logo from '@/assets/logo.svg';
import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants/navItems';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const activePage: String = NAV_ITEMS[location.pathname] || "Персонаж";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className='relative bg-white'>
      <div className='flex max-w-7xl mx-auto items-center justify-between p-4 shadow-b border-neutral-300'>
        <div className='flex gap-4 items-center'>
          <div className='w-24 lg:border-r border-neutral-300 pr-5'>
            <Link to={'/'}>
              <img src={logo} alt='Logo' className='w-full h-auto' />
            </Link>
          </div>
          <div className='font-bold text-lg hidden lg:block'>{activePage}</div>
        </div>
        <nav className='hidden lg:flex gap-4'>
          {Object.entries(NAV_ITEMS).map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`transition-colors hover:text-purple-500 ${location.pathname === path
                ? 'font-bold text-purple-500'
                : 'text-gray-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Открыть меню'
        >
          {isMobileMenuOpen ? (
            <X size={24} className='text-gray-600' />
          ) : (
            <Menu size={24} className='text-gray-600' />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className='lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50'>
          <div className='p-4 font-bold text-lg border-b border-gray-200'>
            {activePage}
          </div>
          <div className='flex flex-col'>
            {Object.entries(NAV_ITEMS).map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  location.pathname === path
                  ? 'font-bold text-purple-500 bg-purple-50'
                  : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
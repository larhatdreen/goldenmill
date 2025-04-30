import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productItems = [
    {
      label: t('nav.matrix'),
      path: '/granulator',
    },
    {
      label: t('nav.shell'),
      path: '/shell',
    },
    {
      label: t('nav.spareParts'),
      path: '/spare-parts',
    }
  ];

  return (
    <nav className="relative">
      <div 
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setIsProductsOpen(true)}
        onMouseLeave={() => setIsProductsOpen(false)}
      >
        <span className="text-navUnselect hover:text-navSelect">
          {t('nav.products')} ▼
        </span>
        
        {isProductsOpen && (
          <div className="absolute top-full left-0 bg-dropdown min-w-[200px] py-2 z-50">
            {productItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 ${
                  location.pathname.includes(item.path)
                    ? 'text-navSelect'
                    : 'text-navUnselect hover:text-navSelect'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 
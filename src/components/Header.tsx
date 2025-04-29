import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  
  const productMenuItems = [
    { 
      label: t('nav.matrix'),
      path: '/granulator' 
    },
    { 
      label: t('nav.shell'),
      path: '/shell' 
    },
    { 
      label: t('nav.spareParts'),
      path: '/spare-parts' 
    }
  ];

  return (
    <header>
      {/* Existing header content */}
      <nav>
        <div className="relative group">
          <button className="flex items-center">
            {t('nav.products')}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="absolute hidden group-hover:block w-48 bg-dropdown">
            {productMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-navUnselect hover:text-navSelect"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Other navigation items */}
      </nav>
    </header>
  );
};

export default Header; 
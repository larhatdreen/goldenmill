import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SunIcon from '../assets/tumbler/SunIcon';
import MoonIcon from '../assets/tumbler/MoonIcon';
import ToggleOval from '../assets/tumbler/ToggleOval';
import ToggleEllipse from '../assets/tumbler/ToggleEllipse';
import { toggleTheme } from '../store/themeSlice';
import { RootState } from '../store';
import { getLocalThemeColor } from '../theme/utils';

// interface ThemeToggleProps {
//   onToggle?: () => void;
// }

const ThemeToggle = () => { // deleted { onToggle }: ThemeToggleProps)
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.shadowTheme);

  const handleClick = () => {
    dispatch(toggleTheme());
    // onToggle?.();
  };

  const { ovalColor, ellipseColor, icon, ellipsePosition, ellipseShadow } = useMemo(
    () => ({
      ovalColor: getLocalThemeColor(isDark, '#666666', '#F0F0F0'),
      ellipseColor: getLocalThemeColor(isDark, '#F0F0F0', '#FFFFFF'),
      icon: isDark ? (
        <SunIcon width={15} height={15} fill={getLocalThemeColor(isDark, '#767676', '#666666')} />
      ) : (
        <MoonIcon width={16} height={17} fill={getLocalThemeColor(isDark, '#767676', '#666666')} />
      ),
      ellipsePosition: isDark ? 'translateX(23px)' : 'translateX(3px)',
      ellipseShadow: '0 2px 8px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.10)',
    }),
    [isDark]
  );

  return (
    <button
      onClick={handleClick}
      className='relative w-[45px] h-[25px] p-0 border-0 bg-transparent rounded-full focus:outline-none'
      aria-label='Toggle theme'
      type='button'
      style={{ display: 'block' }}
    >
      <ToggleOval fill={ovalColor} />

      <div
        className='absolute top-[3px] left-0 w-[19px] h-[19px] rounded-full transition-transform duration-300 flex items-center justify-center'
        style={{ transform: ellipsePosition, boxShadow: ellipseShadow }}
      >
        <ToggleEllipse fill={ellipseColor} />
        <span className='absolute inset-0 flex items-center justify-center'>{icon}</span>
      </div>
    </button>
  );
};

export default ThemeToggle;

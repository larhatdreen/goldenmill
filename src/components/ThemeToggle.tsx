import { useState, useEffect, useMemo } from 'react';
import SunIcon from '../assets/tumbler/SunIcon';
import MoonIcon from '../assets/tumbler/MoonIcon';
import ToggleOval from '../assets/tumbler/ToggleOval';
import ToggleEllipse from '../assets/tumbler/ToggleEllipse';

interface ThemeToggleProps {
  onToggle?: () => void;
}

const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const handleClick = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
      onToggle?.();
      return newIsDark;
    });
  };

  const {
    ovalColor,
    ellipseColor,
    icon,
    ellipsePosition,
    ellipseShadow
  } = useMemo(() => ({
    ovalColor: isDark ? '#666666' : '#767676',
    ellipseColor: isDark ? '#FFFFFF' : '#F0F0F0',
    icon: isDark
      ? <SunIcon width={15} height={15} fill="#666666" />
      : <MoonIcon width={16} height={17} fill="#767676" />,
    ellipsePosition: isDark ? 'translateX(23px)' : 'translateX(3px)',
    ellipseShadow: '0 2px 8px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
  }), [isDark]);

  return (
    <button
      onClick={handleClick}
      className="relative w-[45px] h-[25px] p-0 border-0 bg-transparent rounded-full focus:outline-none"
      aria-label="Toggle theme"
      type="button"
      style={{ display: 'block' }}
    >
      {/* Овал-фон */}
      <ToggleOval fill={ovalColor} />
      {/* Эллипс-ползунок */}
      <div
        className="absolute top-[3px] left-0 w-[19px] h-[19px] rounded-full transition-transform duration-300 flex items-center justify-center"
        style={{ transform: ellipsePosition, boxShadow: ellipseShadow }}
      >
        <ToggleEllipse fill={ellipseColor} />
        <span className="absolute inset-0 flex items-center justify-center">
          {icon}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle; 
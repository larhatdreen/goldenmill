import { useState, useEffect } from 'react';
import lightIcon from '../assets/tumbler/light.png';
import nightIcon from '../assets/tumbler/night.png';

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
    onToggle?.();
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-12 h-6 rounded-full focus:outline-none transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#666666' : '#E5E5E5',
      }}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center`}
        style={{
          transform: isDark ? 'translateX(0)' : 'translateX(24px)',
          backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF',
        }}
      >
        <img 
          src={isDark ? nightIcon : lightIcon} 
          alt={isDark ? "Night mode" : "Light mode"}
          className="w-3 h-3"
        />
      </div>
    </button>
  );
};

export default ThemeToggle; 
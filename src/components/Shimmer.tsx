import { useTheme } from '../hooks/useTheme';

interface ShimmerProps {
    width?: string;
    height?: string;
    borderRadius?: string;
  }
  
  const Shimmer: React.FC<ShimmerProps> = ({ width = '100%', height = '100%', borderRadius = '20px' }) => {
    const theme = useTheme();
    return (
      <div
        className={`relative ${theme.name === 'dark' ? 'bg-[#ffffff03]' : 'bg-[#00000030]'} overflow-hidden`}
        style={{ width, height, borderRadius }}
      >
        <div
          className="absolute -top-40 w-[20%]  h-[150%] bg-gradient-to-r from-transparent via-[#ffffff]/15 to-transparent animate-shine"
          style={{rotate: '10deg'}}
        />
      </div>
    );
  };
  
  export default Shimmer;
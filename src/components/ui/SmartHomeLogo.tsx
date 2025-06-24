import React from 'react';

interface SmartHomeLogoProps {
  size?: number;
  className?: string;
  variant?: 'icon' | 'circle' | 'brand' | 'brand-inline';
  showText?: boolean;
}

const SmartHomeLogo: React.FC<SmartHomeLogoProps> = ({ 
  size = 24, 
  className = "", 
  variant = 'icon',
  showText = false 
}) => {
  
  // 圓形背景版本的 Logo - 使用PNG圖片
  const CircleLogo = () => (
    <div className={`relative inline-flex items-center justify-center ${className}`} 
         style={{ width: size, height: size }}>
      <img
        src="/homeLogo.png"
        alt="Smart Home Logo"
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    </div>
  );

  // 原始圖標版本
  const IconLogo = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 房屋主體 */}
      <path
        d="M3 12L12 3L21 12V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V12Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 門 */}
      <path
        d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* WiFi 信號弧線 */}
      <path
        d="M16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      
      <path
        d="M17.5 11.5C19.433 11.5 21 9.933 21 8C21 6.067 19.433 4.5 17.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      
      {/* WiFi 中心點 */}
      <circle
        cx="15"
        cy="8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );

  // 品牌版本 - Logo + 文字 (垂直排列)
  const BrandLogo = () => (
    <div className="flex items-center space-x-3">
      <CircleLogo />
      <div className="flex flex-col">
        <div className="text-lg font-bold text-gray-900 leading-tight">Smart Home</div>
        <div className="text-sm text-gray-500 leading-tight">居家智能中心</div>
      </div>
    </div>
  );

  // 品牌版本 - Logo + 文字 (水平排列)
  const BrandInlineLogo = () => (
    <div className="flex items-center space-x-4">
      <CircleLogo />
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold text-gray-900">Smart Home</span>
        <span className="text-gray-400 text-lg">|</span>
        <span className="text-base text-gray-600 font-medium">居家智能中心</span>
      </div>
    </div>
  );

  switch (variant) {
    case 'circle':
      return <CircleLogo />;
    case 'brand':
      return <BrandLogo />;
    case 'brand-inline':
      return <BrandInlineLogo />;
    default:
      return <IconLogo />;
  }
};

export default SmartHomeLogo; 
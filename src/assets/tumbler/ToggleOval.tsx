import React from 'react';

const ToggleOval = ({ fill = '#F0F0F0', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={45} height={25} viewBox="0 0 45 25" fill="none" {...props}>
    <rect x="0" y="0" width="45" height="25" rx="12.5" fill={fill} />
  </svg>
);

export default ToggleOval; 
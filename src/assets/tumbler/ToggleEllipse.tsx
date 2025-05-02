import React from 'react';

const ToggleEllipse = ({ fill = '#F0F0F0', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" fill="none" {...props}>
    <circle cx="9.5" cy="9.5" r="9.5" fill={fill} />
  </svg>
);

export default ToggleEllipse; 
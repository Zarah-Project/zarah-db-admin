import React from 'react';

const Label = ({label}) => {
  return (
    <label style={{
      color: 'rgba(0, 0, 0, 0.85)',
      display: 'block',
      margin: 0,
      padding: '0 0 8px',
      lineHeight: 1.5,
      whiteSpace: 'initial',
      textAlign: 'left'
    }}>{label}</label>
  )
};

export default Label

import React from 'react';

export default function HeaderBox({ subtext, title, type = 'title', user }: HeaderBoxProps) {
  return (
    <div className='header-box'>
      <h1 className='header-box-title'>
        {title}
        {type === 'greeting' && <span className='text-bankGradient'>&nbsp;{user}</span>}
      </h1>
      <p className='header-box-subtext'>{subtext}</p>
    </div>
  );
}

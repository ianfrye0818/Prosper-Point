import React from 'react';

export default function SideBarFooter({ user, type }: FooterProps) {
  console.log(user.name);
  return (
    <footer className='footer'>
      <div className='footer_name'>
        <p className='text-xl font-bold text-gray-700'>{user.name}</p>
      </div>
    </footer>
  );
}

'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import SideBarFooter from './SideBarFooter';

export default function Sidebar({ user }: SiderbarProps) {
  const pathName = usePathname();
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link
          href='/'
          className='mb-12 cursor-pointer items-center gap-2 flex'
        >
          <Image
            src='/icons/logo.svg'
            alt='logo'
            width={34}
            height={34}
            className='size=[24px] max-xl:size-14'
          />
          <h1 className='sidebar-logo'>Prosper Point</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
          return (
            <Link
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
              key={link.label}
              href={link.route}
            >
              <div className='relative size-6'>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive,
                  })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>{link.label}</p>
            </Link>
          );
        })}
        USER
      </nav>
      <SideBarFooter user={user} />
    </section>
  );
}

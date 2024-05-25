'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from '../../_authActions/plaid.actions';
import Image from 'next/image';

export default function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      setIsLoading(true);

      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push('/');
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [user]
  );
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready || isLoading}
          className='plaidlink-primary'
        >
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          variant={'ghost'}
          className='plaidlink-ghost'
        >
          <Image
            src={'/icons/connect-bank.svg'}
            alt='Connect Bank'
            width={24}
            height={24}
          />
          <p className='hidden xl:block text-[16px] font-semibold text-black-2'>Connect Bank</p>
        </Button>
      ) : variant === 'link' ? (
        <Button
          variant={'link'}
          onClick={() => open()}
        >
          <Image
            src={'/icons/plus.svg'}
            width={20}
            height={20}
            alt='+'
          />
          <h2 className='text-14 font-semibold text-gray-600'>Add Bank</h2>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          className='plaidlink-default'
        >
          <Image
            src={'/icons/connect-bank.svg'}
            alt='Connect Bank'
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect Bank</p>
        </Button>
      )}
    </>
  );
}

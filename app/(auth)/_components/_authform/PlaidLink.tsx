'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from '../../_authActions/plaid.actions';

export default function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push('/');
      } catch (error) {
        console.error(error);
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
          disabled={!ready}
          className='plaidlink-primary'
        >
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
}

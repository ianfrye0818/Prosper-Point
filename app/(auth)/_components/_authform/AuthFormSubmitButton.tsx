import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { AuthFormSubmitButtonProps } from '@/types';

export default function AuthFormSubmitButton({ type, isLoading }: AuthFormSubmitButtonProps) {
  return (
    <Button
      className='form-btn'
      type='submit'
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2
            size={20}
            className='animate-spin'
          />{' '}
          &nbsp; loading...
        </>
      ) : type === 'sign-in' ? (
        'Sign In'
      ) : (
        'Sign Up'
      )}
    </Button>
  );
}

import { FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ShowPasswordButton from '../_authform/AuthFormShowPasswordButton';
import * as z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { AUTH_FORM_SCHEMA } from '@/zod-schemas/index.';
import { useState } from 'react';

const formSchema = AUTH_FORM_SCHEMA('sign-up');

interface SSNInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  obscure?: boolean;
}

export default function SSNInput({ obscure = true, form }: SSNInputProps) {
  const [isVisable, setIsVisable] = useState(obscure);

  const formatSSN = (value: string) => {
    if (!value) return;
    const formattedValue = value.replace(/\D/g, '').replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
    return formattedValue;
  };

  return (
    <FormField
      control={form.control}
      name={'ssn'}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>SSN</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <div className='relative'>
                <Input
                  type={isVisable ? 'password' : 'text'}
                  placeholder='XXX-XX-XXXX'
                  className='input-class'
                  onChange={(e) => {
                    const formattedValue = formatSSN(e.target.value);
                    onChange(formattedValue);
                  }}
                  value={formatSSN(value as string)}
                />
                {obscure && (
                  <ShowPasswordButton
                    setIsVisable={setIsVisable}
                    isVisable={isVisable}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage className='form-message' />
          </div>
        </div>
      )}
    />
  );
}

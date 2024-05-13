import React, { useState } from 'react';
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath } from 'react-hook-form';

import * as z from 'zod';
import { AUTH_FORM_SCHEMA } from '@/zod-schemas/index.';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from './ui/button';

type FormInputProps = {
  label?: string;
  placeholder?: string;
  name: FieldPath<z.infer<typeof AUTH_FORM_SCHEMA>>;
  control: Control<z.infer<typeof AUTH_FORM_SCHEMA>>;
};

export default function ZodFormFieldInput({ label, placeholder, name, control }: FormInputProps) {
  const [isVisable, setIsVisable] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <div className='relative'>
                <Input
                  type={name === 'password' && !isVisable ? 'password' : 'text'}
                  placeholder={placeholder}
                  className='input-class'
                  {...field}
                />
                {name === 'password' && (
                  <Button
                    asChild
                    className=''
                  >
                    <>
                      {!isVisable ? (
                        <EyeIcon
                          onClick={() => setIsVisable((prev) => !prev)}
                          size={20}
                          className='absolute right-3 top-1/2 -translate-y-1/2'
                        />
                      ) : (
                        <EyeOffIcon
                          onClick={() => setIsVisable((prev) => !prev)}
                          size={20}
                          className='absolute right-3 top-1/2 -translate-y-1/2'
                        />
                      )}
                    </>
                  </Button>
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

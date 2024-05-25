import { useState } from 'react';
import * as z from 'zod';
import { FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ShowPasswordButton from './AuthFormShowPasswordButton';
import { FieldPath, Control } from 'react-hook-form';
import { AUTH_FORM_SCHEMA } from '@/zod-schemas/index.';

const formSchema = AUTH_FORM_SCHEMA('sign-up');
//Ommitting DOB and SSN since they have their own custom fields
interface FormInputProps {
  label?: string;
  placeholder?: string;
  name: FieldPath<Omit<z.infer<typeof formSchema>, 'dateOfBirth' | 'ssn'>>;
  control: Control<Omit<z.infer<typeof formSchema>, 'dateOfBirth' | 'ssn'>>;
  obscure?: boolean;
}

export default function ZodFormFieldInput({
  label,
  placeholder,
  name,
  control,
  obscure = false,
}: FormInputProps) {
  const [isVisable, setIsVisable] = useState(obscure);
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
                  type={isVisable ? 'password' : 'text'}
                  placeholder={placeholder}
                  className='input-cla ss'
                  {...field}
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

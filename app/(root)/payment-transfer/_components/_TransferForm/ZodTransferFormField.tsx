'use client';
import * as z from 'zod';
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldPath, Control, ControllerRenderProps, UseFormSetValue } from 'react-hook-form';
import { PAYMENT_TRANSFER_FORM_SCHEMA } from '@/zod-schemas/index.';
import { Textarea } from '@/components/ui/textarea';
import { BankDropdown } from './BankDropDown';
import { InputType } from '@/types/enums';

const formSchema = PAYMENT_TRANSFER_FORM_SCHEMA;
interface FormInputProps {
  type?: InputType;
  label?: string;
  placeholder?: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  otherStyles?: string;
  description?: string;
  setValue?: UseFormSetValue<z.infer<typeof formSchema>>;
  accounts?: Account[];
  inputProps?: string;
  labelProps?: string;
  itemProps?: string;
}

export default function ZodTransferFormField(props: FormInputProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => getInputType(field, props)}
    />
  );
}

function TransferFormInput(
  field: ControllerRenderProps<z.infer<typeof formSchema>>,
  { label, placeholder }: FormInputProps
) {
  return (
    <FormItem className='border-t border-gray-200'>
      <div className='payment-transfer_form-item py-5'>
        <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
          {label}
        </FormLabel>
        <div className='flex w-full flex-col'>
          <FormControl>
            <Input
              placeholder={placeholder ?? ''}
              className='input-class'
              {...field}
            />
          </FormControl>
          <FormMessage className='text-12 text-red-500' />
        </div>
      </div>
    </FormItem>
  );
}

function TransferTextAreaInput(
  field: ControllerRenderProps<z.infer<typeof formSchema>>,
  { label, description, placeholder }: FormInputProps
) {
  return (
    <FormItem className='border-t border-gray-200'>
      <div className='payment-transfer_form-item pb-6 pt-5'>
        <div className='payment-transfer_form-content'>
          {label && <FormLabel className='text-14 font-medium text-gray-700'>{label}</FormLabel>}
          <FormDescription className='text-12 font-normal text-gray-600'>
            {description}
          </FormDescription>
        </div>
        <div className='flex w-full flex-col'>
          <FormControl>
            <Textarea
              placeholder={placeholder ?? ''}
              className='input-class'
              rows={8}
              {...field}
            />
          </FormControl>
          <FormMessage className='text-12 text-red-500' />
        </div>
      </div>
    </FormItem>
  );
}

function SelectBankInput(
  field: ControllerRenderProps<z.infer<typeof formSchema>>,
  { label, description, accounts, setValue }: FormInputProps
) {
  return (
    <FormItem className='border-t border-gray-200'>
      <div className='payment-transfer_form-item pb-6 pt-5'>
        <div className='payment-transfer_form-content'>
          <FormLabel className='text-14 font-medium text-gray-700'>{label}</FormLabel>
          <FormDescription className='text-12 font-normal text-gray-600'>
            {description}
          </FormDescription>
        </div>
        <div className='flex w-full flex-col'>
          <FormControl>
            {accounts && (
              <BankDropdown
                accounts={accounts}
                setValue={setValue}
                otherStyles='!w-full'
              />
            )}
          </FormControl>
          <FormMessage className='text-12 text-red-500' />
        </div>
      </div>
    </FormItem>
  );
}

function getInputType(
  field: ControllerRenderProps<z.infer<typeof formSchema>>,
  props: FormInputProps
) {
  switch (props.type) {
    case InputType.TEXTAREA:
      return TransferTextAreaInput(field, props);
    case InputType.SELECT:
      return SelectBankInput(field, props);
    case InputType.INPUT:
    default:
      return TransferFormInput(field, props);
  }
}

// document-verification/frontend/src/components/ui/select/index.jsx
import React, { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';

const Select = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Root ref={ref} {...props}>
    {children}
  </SelectPrimitive.Root>
));

const SelectTrigger = React.forwardRef(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      'bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
));

const SelectContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={clsx(
      'bg-white border border-gray-300 rounded-md shadow-lg',
      className
    )}
    {...props}
  >
    <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
  </SelectPrimitive.Content>
));

const SelectItem = React.forwardRef(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      'text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 focus:outline-none focus-visible:bg-blue-50',
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Item>
));

const SelectValue = React.forwardRef(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Value ref={ref} className={className} {...props}>
    {children}
  </SelectPrimitive.Value>
));

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
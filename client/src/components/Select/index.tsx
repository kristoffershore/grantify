import { useField } from '@unform/core';
import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { SelectBlock } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  isQuantityCounter?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  isQuantityCounter = false,
  options,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>
      <select id={name} ref={selectRef} {...rest}>
        <option selected disabled hidden>
          {isQuantityCounter ? 'Quantity' : 'Select an option'}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SelectBlock>
  );
};

export default Select;

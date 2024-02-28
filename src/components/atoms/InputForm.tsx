import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { UseFormRegister } from 'react-hook-form';

interface IInputForm {
  name?: string | undefined;
  register?: UseFormRegister<any>;
  validationRules?: Record<string, unknown>;
  label: string;
  type: string;
  value: string | number;
  onChangeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}
const InputForm: React.FC<IInputForm> = ({
  label,
  name,
  type,
  value,
  onChangeFunction,
  error,
  register,
  validationRules,
}) => {
  return (
    <label className='flex flex-col'>
      <span className='text-sm'>{label}:</span>
      {error && <p className='error-message'>{error}</p>}
      <input
        {...(register && name && validationRules
          ? register(name, validationRules)
          : {})}
        type={type}
        className={cn('form-input', { 'form-input-error': error })}
        value={value}
        onChange={onChangeFunction}
      />
    </label>
  );
};

export default InputForm;

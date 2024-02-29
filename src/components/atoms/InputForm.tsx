import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { UseFormRegister } from 'react-hook-form';

interface IInputForm {
  type: string;
  label: string;
  name?: string | undefined;
  register?: UseFormRegister<any>;
  validationRules?: Record<string, unknown>;
  value: string | number | null;
  placeholder?: string;
  onChangeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  labelClassName?: string;
}

const InputForm: React.FC<IInputForm> = ({
  type,
  label,
  name,
  register,
  validationRules,
  value,
  placeholder,
  onChangeFunction,
  error,
  labelClassName,
}) => {
  return (
    <label className={`flex flex-col ${labelClassName}`}>
      <span className='text-md'>{label}</span>
      {error && <p className='error-message'>{error}</p>}
      <input
        {...(register &&
          name &&
          validationRules &&
          register(name, validationRules))}
        type={type}
        name={name}
        className={cn('form-input', { 'form-input-error': error })}
        value={value !== null ? value : ''}
        placeholder={placeholder}
        onChange={onChangeFunction}
      />
    </label>
  );
};

export default InputForm;

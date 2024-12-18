import React from 'react';

interface InputFieldProps {
  label: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean; 
  error?: string; 
  type?: string; 
  className?: string; 
  placeholder?: string
 
  
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  type = 'text',
  className = '',
  placeholder = '',
  
 
}) => {
  return (
    <label className='pass-fio'>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${className} ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputField;

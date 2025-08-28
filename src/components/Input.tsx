import React from 'react';
import './components.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, ...props }, ref) => {
    return (
      <div className='input-component'>
        <label htmlFor={name}>
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          style={{ borderColor: error ? 'red' : '#ccc' }}
          {...props}
        />
        {error && <p className='input-error'>{error}</p>}
      </div>
    );
  }
);

export default Input;

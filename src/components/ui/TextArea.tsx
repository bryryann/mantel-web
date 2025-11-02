import React from 'react';
import './ui.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  value: string;
  error?: string;
  className: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`textarea-ui-div ${className}`}>
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <textarea
        className='textarea-ui-component'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        {...props}
      />

      {error && <p className='textarea-error-p'>{error}</p>}
    </div>
  );
};

export default TextArea;

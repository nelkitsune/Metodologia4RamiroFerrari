import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  name, 
  value, 
  type = 'text', 
  onChange, 
  error 
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
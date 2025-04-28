import React, { useState } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onChange?.(isChecked);
  };

  const checkBoxId = `${label}-checkbox`.replace(/\s+/g, '-').toLowerCase();

  return (
    <label htmlFor={checkBoxId} className={styles['checkbox-field']}>
      <span>{label}</span>
      <input
        id={checkBoxId}
        // Hide the default checkbox visually but keep it accessible for screen readers
        className="visually-hidden"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={styles['checkmark']}></span>
    </label>
  );
};

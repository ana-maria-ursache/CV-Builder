import { memo } from 'react';

function TextAreaField({ label, name, placeholder, onChange, rows = 3, fullWidth = true }) {
  return (
    <div className={`cv-input-group ${fullWidth ? 'full-width' : ''}`}>
      {label && <label>{label}</label>}
      <textarea
        name={name}
        className="cv-field cv-textarea"
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default memo(TextAreaField);

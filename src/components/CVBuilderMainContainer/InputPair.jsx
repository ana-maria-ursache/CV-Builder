import { memo } from 'react';

function InputPair({ field1, field2, onChange }) {
  const renderField = (field) => {
    if (!field) return null;
    const { label, name, type = 'text', placeholder, fullWidth = false } = field;

    return (
      <div key={name} className={`cv-input-group ${fullWidth ? 'full-width' : ''}`}>
        {label && <label>{label}</label>}
        <input
          name={name}
          type={type}
          className="cv-field"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  };

  return (
    <>
      {renderField(field1)}
      {renderField(field2)}
    </>
  );
}

export default memo(InputPair);

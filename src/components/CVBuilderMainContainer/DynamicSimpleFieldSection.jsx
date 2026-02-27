import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField } from '../../store/cvSlice';
import Section from './Section';
import './DynamicSimpleFieldSection.css';

function DynamicSimpleFieldSection({ title, fieldName, placeholder, cvData }) {
  const dispatch = useDispatch();
  const [newValue, setNewValue] = useState('');

  const getArrayFromPath = (path) => {
    const parts = path.split('.');
    let current = cvData;
    for (const part of parts) {
      current = current[part];
    }
    return Array.isArray(current) ? current : [];
  };

  const items = getArrayFromPath(fieldName);

  const handleAddItem = () => {
    if (newValue.trim()) {
      const updatedArray = [...items, newValue];
      dispatch(updateField({ path: fieldName, value: updatedArray }));
      setNewValue('');
    }
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const updatedArray = items.filter((_, i) => i !== index);
      dispatch(updateField({ path: fieldName, value: updatedArray }));
    }
  };

  const handleUpdateItem = (index, value) => {
    const updatedArray = [...items];
    updatedArray[index] = value;
    dispatch(updateField({ path: fieldName, value: updatedArray }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <Section
      title={title}
      actionButton={
        <button
          type="button"
          onClick={handleAddItem}
          className="add-simple-item-btn"
          title={`Add another ${title.toLowerCase()}`}
          disabled={!newValue.trim()}
        >
          +
        </button>
      }
    >
      <div className="simple-items-list">
        {items.map((item, index) => (
          <div key={index} className="simple-item">
            <input
              type="text"
              value={item}
              onChange={(e) => handleUpdateItem(index, e.target.value)}
              placeholder={placeholder}
              className="simple-item-input"
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="simple-remove-btn"
                title="Remove this entry"
              >
                −
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="add-simple-item-group">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add new: ${placeholder}`}
          className="add-simple-item-input"
        />
      </div>
    </Section>
  );
}

export default memo(DynamicSimpleFieldSection);

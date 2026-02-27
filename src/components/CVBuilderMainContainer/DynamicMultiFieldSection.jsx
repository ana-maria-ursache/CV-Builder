import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../store/cvSlice';
import Section from './Section';
import InputPair from './InputPair';
import TextAreaField from './TextAreaField';
import './DynamicMultiFieldSection.css';
import { useTranslation } from 'react-i18next';

function DynamicMultiFieldSection({
  title,
  arrayPath,
  cvData,
  fields,
  textAreaTemplate,
  onChange,
  template,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getArrayFromPath = (path) => {
    const parts = path.split('.');
    let current = cvData;
    for (const part of parts) {
      current = current[part];
    }
    return Array.isArray(current) ? current : [];
  };

  const items = getArrayFromPath(arrayPath);

  const handleAddItem = () => {
    dispatch(addItem({ path: arrayPath, template }));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem({ path: arrayPath, index }));
  };

  return (
    <Section
      title={title}
      actionButton={
        <button
          type="button"
          onClick={handleAddItem}
          className="add-item-btn"
          title={`Add another ${title.toLowerCase()}`}
        >
          +
        </button>
      }
    >
      {items.map((item, index) => (
        <div key={index} className="dynamic-item-container">
          <div className="item-header">
            <span className="item-number">
              {t('entry-number')} {index + 1}
            </span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="remove-btn"
                title="Remove this entry"
              >
                −
              </button>
            )}
          </div>

          {fields &&
            fields.map((fieldPair, pairIndex) => {
              const field1 = fieldPair[0];
              const field2 = fieldPair[1];

              return (
                <InputPair
                  key={pairIndex}
                  field1={{
                    ...field1,
                    name: `${arrayPath}.${index}.${field1.name}`,
                  }}
                  field2={
                    field2
                      ? {
                          ...field2,
                          name: `${arrayPath}.${index}.${field2.name}`,
                        }
                      : undefined
                  }
                  onChange={onChange}
                />
              );
            })}

          {textAreaTemplate && (
            <TextAreaField
              label={textAreaTemplate.label}
              name={`${arrayPath}.${index}.${textAreaTemplate.name}`}
              placeholder={textAreaTemplate.placeholder}
              onChange={onChange}
            />
          )}
        </div>
      ))}
    </Section>
  );
}

export default memo(DynamicMultiFieldSection);

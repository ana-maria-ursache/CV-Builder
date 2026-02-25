import { memo } from 'react';
import Section from './Section';
import InputPair from './InputPair';

function SingleFieldSection({ title, fieldName, fieldLabel, placeholder, onChange }) {
  return (
    <Section title={title}>
      <InputPair
        field1={{
          name: fieldName,
          label: fieldLabel,
          placeholder,
          fullWidth: true,
        }}
        onChange={onChange}
      />
    </Section>
  );
}

export default memo(SingleFieldSection);

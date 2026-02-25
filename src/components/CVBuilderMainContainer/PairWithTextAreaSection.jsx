import { memo } from 'react';
import Section from './Section';
import InputPair from './InputPair';
import TextAreaField from './TextAreaField';

function PairWithTextAreaSection({
  title,
  field1,
  field2,
  textAreaLabel,
  textAreaName,
  textAreaPlaceholder,
  onChange,
}) {
  return (
    <Section title={title}>
      <InputPair field1={field1} field2={field2} onChange={onChange} />
      <TextAreaField
        label={textAreaLabel}
        name={textAreaName}
        placeholder={textAreaPlaceholder}
        onChange={onChange}
      />
    </Section>
  );
}

export default memo(PairWithTextAreaSection);

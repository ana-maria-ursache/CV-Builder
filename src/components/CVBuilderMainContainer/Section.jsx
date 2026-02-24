import { memo } from 'react';

function Section({ title, children }) {
  return (
    <section className="cv-section">
      <h2 className="section-label">{title}</h2>
      <div className="cv-grid">{children}</div>
    </section>
  );
}

export default memo(Section);

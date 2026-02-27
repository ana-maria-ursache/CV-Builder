import { memo } from 'react';

function Section({ title, children, actionButton }) {
  return (
    <section className="cv-section">
      <div className="section-header">
        <h2 className="section-label">{title}</h2>
        {actionButton && <div className="section-action">{actionButton}</div>}
      </div>
      <div className="cv-grid">{children}</div>
    </section>
  );
}

export default memo(Section);

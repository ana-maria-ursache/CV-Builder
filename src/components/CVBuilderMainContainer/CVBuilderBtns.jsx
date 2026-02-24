import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { resetCV, updateField } from '../../store/cvSlice';

function CVBuilderBtns({ cvData }) {
  const dispach = useDispatch();
  const { t } = useTranslation();

  const saveCV = () => {
    dispach(updateField(cvData));
    //TODO: save in baza de date un anumit id
  };

  const handleReset = () => {
    dispach(resetCV());
  };

  const downloadCV = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    //TODO: download the pdf
  };

  return (
    <div className="cv-buttons">
      <button type="button" onClick={saveCV} className="cv-btn">
        {t('save-progr')}
      </button>
      <button type="button" onClick={downloadCV} className="cv-btn">
        {t('download-pdf')}
      </button>
      <button type="button" onClick={handleReset} className="cv-btn">
        {t('reset-btn')}
      </button>
    </div>
  );
}

export default memo(CVBuilderBtns);

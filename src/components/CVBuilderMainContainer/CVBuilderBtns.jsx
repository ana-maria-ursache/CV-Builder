import { memo } from 'react';

function CVBuilderBtns({ cvData, setCvData, initialValues }) {
  const saveCV = () => {
    setCvData(initialValues);
    //TODO: save in baza de date un anumit id
  };

  const resetCV = () => {
    setCvData(initialValues);
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
        Salveaza progresul
      </button>
      <button type="button" onClick={downloadCV} className="cv-btn">
        Descarcă
      </button>
      <button type="button" onClick={resetCV} className="cv-btn">
        Reseteaza
      </button>
    </div>
  );
}

export default memo(CVBuilderBtns);

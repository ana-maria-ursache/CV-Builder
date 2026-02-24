import { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { resetCV } from '../../store/cvSlice';

import { PDFDownloadLink } from '@react-pdf/renderer';
import CVBuilderView from '../CVBuilderVIew/CVBuilderVIew';

const getFilteredData = (currentData, initialData) => {
  const filtered = {};

  if (!currentData) return filtered;

  Object.keys(currentData).forEach((key) => {
    const value = currentData[key];
    const initialValue = initialData ? initialData[key] : undefined;
    if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedFiltered = getFilteredData(value, initialValue || {});
        if (Object.keys(nestedFiltered).length > 0) {
          filtered[key] = nestedFiltered;
        }
      } else if (Array.isArray(value)) {
        const filteredArray = value.filter((item, index) => {
          const initArrVal = initialValue && initialValue[index] ? initialValue[index] : {};
          return JSON.stringify(item) !== JSON.stringify(initArrVal);
        });
        if (filteredArray.length > 0) {
          filtered[key] = filteredArray;
        }
      } else if (value !== '' && value !== null) {
        filtered[key] = value;
      }
    }
  });

  return filtered;
};

function CVBuilderBtns({ cvData, initialValues }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const filteredCvData = useMemo(
    () => getFilteredData(cvData, initialValues),
    [cvData, initialValues]
  );

  // const saveCV = async () => { //TODO: implement save to DB
  //   try {
  //     // const { id } = useParams();

  //     const { data, error } = await supabase.from('cv_storage').upsert({
  //       id: id,
  //       content: filteredCvData,
  //       last_updated: new Date(),
  //     });

  //     if (error) throw error;
  //     toast.success(t('save-success'));
  //   } catch (err) {
  //     toast.error(t('save-failed'));
  //   }
  // };

  const handleReset = () => {
    dispatch(resetCV());
  };

  // const downloadAsJSON = () => {
  //   const dataStr = JSON.stringify(cvData, null, 2);
  //   const dataBlob = new Blob([dataStr], { type: 'application/json' });
  //   const url = URL.createObjectURL(dataBlob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `CV_${new Date().getTime()}.json`;
  //   link.click();
  //   URL.revokeObjectURL(url);
  //   return url;
  // };

  return (
    <div className="cv-buttons">
      {/* <button type="button" onClick={saveCV} className="cv-btn">
        {t('save-progr')}
      </button> */}

      <PDFDownloadLink
        document={<CVBuilderView data={filteredCvData} />}
        fileName={`CV_${cvData?.personal?.name || 'User'}.pdf`}
        className="cv-btn"
        style={{ textDecoration: 'none', textAlign: 'center' }}
      >
        {({ loading }) => (loading ? t('loading') : t('download-pdf'))}
      </PDFDownloadLink>

      <button type="button" onClick={handleReset} className="cv-btn">
        {t('reset-btn')}
      </button>
    </div>
  );
}

export default memo(CVBuilderBtns);

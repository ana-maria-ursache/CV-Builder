import { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import supabase from '../../utils/supabaseClient';
import { toast } from 'sonner';

import { useDispatch } from 'react-redux';
import { resetCV } from '../../store/cvSlice';

import { PDFDownloadLink } from '@react-pdf/renderer';
import CVBuilderView from '../CVBuilderVIew/CVBuilderVIew';
import { sendEmail } from '../../utils/sendEmail';
import env from '../../../config';
import { pdf } from '@react-pdf/renderer';

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

  const { isLoggedIn, currentUser } = useSelector((state) => state.user);

  const filteredCvData = useMemo(
    () => getFilteredData(cvData, initialValues),
    [cvData, initialValues]
  );

  const saveCV = async () => {
    try {
      const { error } = await supabase.from('cv_versions').insert([
        {
          user_id: currentUser.id,
          cv_content: filteredCvData,
          cv_title: `${cvData?.personal?.name || 'Untitled'}_${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          version_name: `Versiune ${new Date().toLocaleDateString()}`,
        },
      ]);

      if (error) throw error;
      toast.success('Versiunea CV-ului a fost salvată!');
    } catch (error) {
      toast.error(error.message || t('save-failed'));
    }
  };

  const handleReset = () => {
    dispatch(resetCV());
  };

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return url;
  };

  const sendCVToEmail = async () => {
    const loadingToast = toast.loading(t('sending-email'));

    try {
      const blob = await pdf(<CVBuilderView data={filteredCvData} />).toBlob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result;

        const params = {
          name: cvData?.personal?.name || 'User',
          email: currentUser.email,
          subject: 'CV - KeyStroke',
          text: t('cv-send'),
          content: base64data,
        };

        await sendEmail(params, env.emailJsServiceID, 'template_iup5jde', env.emailJsKey);

        toast.success(t('email-sent-success'), { id: loadingToast });
      };
    } catch (error) {
      toast.error(error + '; ' + t('email-failed'), { id: loadingToast });
    }
  };
  return (
    <div className="cv-buttons">
      {isLoggedIn && (
        <button type="button" onClick={saveCV} className="cv-btn">
          {t('save-progr')}
        </button>
      )}

      <PDFDownloadLink
        document={<CVBuilderView data={filteredCvData} />}
        fileName={`CV_${cvData?.personal?.name || 'User'}.pdf`}
        className="cv-btn"
        style={{ textDecoration: 'none', textAlign: 'center' }}
      >
        {({ loading }) => (loading ? t('loading') : t('download-pdf'))}
      </PDFDownloadLink>

      {isLoggedIn && (
        <button type="button" onClick={downloadAsJSON} className="cv-btn">
          {t('json-btn')}
        </button>
      )}

      {isLoggedIn && (
        <button type="button" onClick={sendCVToEmail} className="cv-btn">
          {t('send-to-email-btn')}
        </button>
      )}

      <button type="button" onClick={handleReset} className="cv-btn">
        {t('reset-btn')}
      </button>
    </div>
  );
}

export default memo(CVBuilderBtns);

import './CVUserList.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../utils/supabaseClient';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function CVUserList() {
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.user);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVs = async () => {
      if (!currentUser) return;

      try {
        const { data, error } = await supabase
          .from('cv_versions')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setCvs(data);
      } catch (error) {
        console.error('Error fetching CVs:', error);
        toast.error(t('error-cv-list'));
      } finally {
        setLoading(false);
      }
    };
    fetchCVs();
  }, [currentUser]);

  const deleteCVVersion = async (id) => {
    const { error } = await supabase.from('cv_versions').delete().eq('id', id);

    if (error) {
      console.error('SUPABASE FAILED:', error);
      toast.error(t('error-delete-version'));
      throw error;
    }

    toast.success(t('version-deleted'));
    setCvs((prev) => prev.filter((cv) => cv.id !== id));
  };

  const openCVVersion = (cvData, id) => {
    const allCVs = JSON.parse(localStorage.getItem('allCVs') || '{}');
    allCVs[id] = cvData;
    localStorage.setItem('allCVs', JSON.stringify(allCVs));

    const url = `/builder/${id}`;
    window.location.href = url;
  };

  if (loading) return <div className="list-container">{t('loading')}</div>;

  return (
    <div className="list-container">
      <h1 className="list-title">{t('saved-versions')}</h1>
      <div className="header-line"></div>
      {cvs.length === 0 ? (
        <p className="empty-msg">{t('niciun-cv')}</p>
      ) : (
        <div className="cv-grid-list">
          {cvs.map((cv) => (
            <div key={cv.id} className="cv-card">
              <div className="cv-card-info">
                <h3>{cv.cv_title || 'Untitled CV'}</h3>
                <p>
                  {t('saved-at')} {new Date(cv.created_at).toLocaleString('ro-RO')}
                </p>
              </div>

              <div className="cv-card-actions">
                <button
                  className="action-btn view"
                  onClick={() => openCVVersion(cv.cv_content, cv.id)}
                >
                  {t('see-cv')}
                </button>
                <button onClick={() => deleteCVVersion(cv.id)} className="action-btn delete">
                  {t('delete-version')}
                </button>{' '}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import './CVUserList.css';
import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from 'lucide-react';
import ButtonUp from '../../components/ButtonUp/ButtonUp';

export default function CVUserList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(() => {
    const saved = localStorage.getItem('cvSortAscending');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('cvSortAscending', JSON.stringify(sortAscending));
  }, [sortAscending]);

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

  const filteredAndSortedCvs = useMemo(() => {
    let result = cvs.filter((cv) =>
      (cv.cv_title || 'Untitled CV').toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortAscending ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [cvs, searchQuery, sortAscending]);

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

    navigate(`/builder/${id}`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortAscending(false);
  };

  if (loading) return <div className="list-container">{t('loading')}</div>;

  return (
    <div className="list-container">
      <h1 className="list-title">{t('saved-versions')}</h1>
      <div className="header-line"></div>

      <div className="search-sort-section">
        <input
          type="text"
          placeholder={t('search-cv') || 'Search by CV name...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="sort-buttons">
          <button
            className={`sort-btn ${!sortAscending ? 'active' : ''}`}
            onClick={() => setSortAscending(false)}
            title="Sort by date descending (newest first)"
          >
            <ChevronDown size={18} />
            {t('newest') || 'Newest'}
          </button>
          <button
            className={`sort-btn ${sortAscending ? 'active' : ''}`}
            onClick={() => setSortAscending(true)}
            title="Sort by date ascending (oldest first)"
          >
            <ChevronUp size={18} />
            {t('oldest') || 'Oldest'}
          </button>

          <button className="reset-btn" onClick={resetFilters}>
            {t('reset-btn')}
          </button>
        </div>
      </div>

      {filteredAndSortedCvs.length === 0 ? (
        <p className="empty-msg">
          {searchQuery ? t('no-results') || 'No CVs found' : t('niciun-cv') || 'No CVs yet'}
        </p>
      ) : (
        <div className="cv-grid-list">
          {filteredAndSortedCvs.map((cv) => (
            <div key={cv.id} className="cv-card">
              <div className="cv-card-info">
                <div className="cv-version-title">{cv.cv_title || 'Untitled CV'}</div>
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
      <ButtonUp />
    </div>
  );
}

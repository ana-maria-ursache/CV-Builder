import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../utils/supabaseClient';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  const { isAdmin } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setUsers(data);
      } catch (err) {
        setError(t('error-fetching-users'));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, t]);

  const toggleAdminRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);

      if (error) throw error;

      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      toast.success(t('role-updated'));
    } catch (err) {
      toast.error(t('update-failed'));
    }
  };

  if (!isAdmin)
    return (
      <div className="dash-container-err">
        <h1>{t('access-denied')}</h1>
      </div>
    );
  if (loading) return <div className="dash-container">{t('loading')}</div>;
  if (error)
    return (
      <div className="dash-container">
        <p className="error-box">{error}</p>
      </div>
    );

  return (
    <div className="dash-container">
      <h1 className="dash-title">{t('dashboard')}</h1>
      <div className="header-line"></div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t('email')}</th>
              <th>{t('role')}</th>
              <th>{t('last-update')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="Email:" className="font-bold">
                  {user.email}
                </td>
                <td data-label="Role:">
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td data-label="Updated:">{new Date(user.updated_at).toLocaleDateString()}</td>
                <td data-label="Action:" className="actions-cell">
                  <button
                    onClick={() => toggleAdminRole(user.id, user.role)}
                    className="dash-btn promote"
                  >
                    {user.role === 'admin' ? t('demote') : t('make-admin')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import supabase from '../../helper/supabaseClient';
import { setUser, setRole } from '../../store/userSlice';
import './Auth.css';

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [formMode, setFormMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t('auth-email-password-required'));
      return;
    }

    setIsSending(true);

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(`${t('auth-error')}: ${error.message}`);
    } else {
      const currentUser = data.user;
      dispatch(setUser(currentUser));

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      if (!profileError && profileData?.role) {
        dispatch(setRole(profileData.role));
      }

      toast.success(t('auth-login-success'));
      setEmail('');
      setPassword('');
      navigate('/');
    }

    setIsSending(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error(t('auth-all-fields-required'));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('auth-passwords-mismatch'));
      return;
    }

    if (password.length < 6) {
      toast.error(t('auth-password-min-length'));
      return;
    }

    setIsSending(true);

    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(`${t('auth-error')}: ${error.message}`);
    } else {
      dispatch(setUser(data.user));
      toast.success(t('auth-signup-success'));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    }

    setIsSending(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{formMode === 'login' ? t('connect') : t('signup')}</h1>

        {formMode === 'login' ? (
          // Login Form
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email-login">Email</label>
              <input
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email-placeholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass-login">{t('password')}</label>
              <input
                id="pass-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('add-password')}
                required
              />
            </div>
            <button type="submit" disabled={isSending} className="auth-btn">
              {' '}
              {isSending ? t('se-incarca') : t('login')}
            </button>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="email-signup">Email</label>
              <input
                id="email-signup"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email-placeholder')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('6-characters')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">{t('confirm-password')}</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirm-password')}
                required
              />
            </div>
            <button type="submit" disabled={isSending} className="auth-btn">
              {isSending ? t('se-incarca') : t('signup')}
            </button>
          </form>
        )}

        <div className="auth-toggle">
          {formMode === 'login' ? (
            <p>
              {t('nu-ai-cont')}{' '}
              <button
                type="button"
                onClick={() => {
                  setFormMode('signup');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="toggle-btn"
              >
                Crează cont
              </button>
            </p>
          ) : (
            <p>
              {t('ai-cont')}{' '}
              <button
                type="button"
                onClick={() => {
                  setFormMode('login');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="toggle-btn"
              >
                {t('connect')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

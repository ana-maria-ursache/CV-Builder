import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';
import { setUser } from '../../store/userSlice';
import './Auth.css';

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Completează email-ul și parola!');
      return;
    }

    setIsSending(true);

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Eroare: ' + error.message);
    } else {
      dispatch(setUser(data.user));
      alert('Conectat cu succes!');
      setEmail('');
      setPassword('');
      navigate('/');
    }

    setIsSending(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert('Completează toate câmpurile!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Parolele nu se potrivesc!');
      return;
    }

    if (password.length < 6) {
      alert('Parola trebuie să aibă cel puțin 6 caractere!');
      return;
    }

    setIsSending(true);

    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert('Eroare: ' + error.message);
    } else {
      dispatch(setUser(data.user));
      alert('Cont creat cu succes! Verifică email-ul pentru confirmație.');
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
        <h1>{formMode === 'login' ? 'Conectare' : 'Creare Cont'}</h1>

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
                placeholder="Introdu email-ul tău"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass-login">Parolă</label>
              <input
                id="pass-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introdu parola ta"
                required
              />
            </div>
            <button type="submit" disabled={isSending} className="auth-btn">
              {' '}
              {isSending ? 'Se conecteaza...' : 'Conectare'}
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
                placeholder="Introdu email-ul tău"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Parolă</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Cel puțin 6 caractere"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmare Parolă</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmă parola"
                required
              />
            </div>
            <button type="submit" disabled={isSending} className="auth-btn">
              {isSending ? 'Se creează...' : 'Crează Cont'}
            </button>
          </form>
        )}

        <div className="auth-toggle">
          {formMode === 'login' ? (
            <p>
              Nu ai cont?{' '}
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
              Ai deja cont?{' '}
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
                Conectează-te
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

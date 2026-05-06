import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearAuthError } = useAuth();

  useEffect(() => {
    clearAuthError();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      {/* Abstract Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem', position: 'relative', zIndex: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--gradient)', width: 72, height: 72, borderRadius: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)', transform: 'rotate(-5deg)' }}>
            <LogIn size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem', letterSpacing: '-2px' }}>Taskify</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>
            Elevate your workflow <Sparkles size={16} style={{ verticalAlign: 'middle', marginLeft: '4px', color: 'var(--warning)' }} />
          </p>
        </div>

        {error && (
          <div style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.08)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(255, 77, 77, 0.2)', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>EMAIL ADDRESS</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@company.com" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>PASSWORD</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%' }} />
          </div>
          <button type="submit" disabled={isLoading} className="btn-primary" style={{ padding: '1.1rem', marginTop: '0.5rem', fontSize: '1.05rem' }}>
            {isLoading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
          New to Taskify? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

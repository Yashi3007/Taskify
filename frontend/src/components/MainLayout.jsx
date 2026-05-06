import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, LogOut, User } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';

const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <div style={{ width: 40, height: 40, background: 'var(--gradient)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem' }}>T</span>
          </div>
          <span style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-1px', color: 'white' }}>Taskify</span>
        </div>
        
        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--gradient)', width: 48, height: 48, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={24} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{user?.role}</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>
        </nav>

        <button onClick={logout} className="sidebar-link" style={{ marginTop: 'auto', color: 'var(--danger)', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

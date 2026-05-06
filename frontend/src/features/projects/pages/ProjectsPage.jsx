import React, { useEffect, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../../auth/hooks/useAuth';
import { Plus, Folder, Trash2, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const { projects, getProjects, createProject, deleteProject, isLoading, error } = useProjects();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createProject(newProject);
    setNewProject({ title: '', description: '' });
    setShowModal(false);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div className="navbar" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Projects</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Manage and track your ongoing works.</p>
        </div>
        {user?.role === 'Admin' && (
          <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Plus size={22} />
            Create Project
          </button>
        )}
      </div>

      {error && (
        <div style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.08)', padding: '1rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid rgba(255, 77, 77, 0.2)', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
        {projects.map((project) => (
          <div key={project._id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'var(--gradient)', opacity: 0.03, borderRadius: '0 0 0 100%' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Layers size={28} color="var(--primary)" />
              </div>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
                      deleteProject(project._id);
                    }
                  }} 
                  style={{ background: 'rgba(255, 51, 102, 0.05)', color: 'var(--danger)', padding: '0.5rem', borderRadius: '10px', border: 'none', cursor: 'pointer', position: 'relative', zIndex: 10 }}
                >
                  <Trash2 size={18} />
                </button>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>{project.description || 'No description provided for this project.'}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>{project.admin?.name?.charAt(0)}</div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{project.admin?.name}</span>
              </div>
              <Link to={`/projects/${project._id}`} className="sidebar-link active" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', marginBottom: 0 }}>
                Open Project
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', border: '2px dashed var(--border)', borderRadius: '32px' }}>
            <Folder size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h2 style={{ color: 'var(--text-muted)' }}>No projects found</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Get started by creating your first project.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.3s ease-out' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>New Project</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>PROJECT TITLE</label>
                <input type="text" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required placeholder="E.g. Lunar Launch" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>DESCRIPTION</label>
                <textarea rows="4" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} placeholder="What is this project about?" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1rem', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '700' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;

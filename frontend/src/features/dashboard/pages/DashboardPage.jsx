import React, { useEffect } from 'react';
import { useTasks } from '../../tasks/hooks/useTasks';
import { useProjects } from '../../projects/hooks/useProjects';
import { CheckCircle2, CircleDashed, Clock, Layers, User, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const { stats, getStats, isLoading: tasksLoading } = useTasks();
  const { projects, getProjects, isLoading: projectsLoading } = useProjects();

  useEffect(() => {
    getStats();
    getProjects();
  }, []);

  const totalTasks = stats?.reduce((acc, curr) => acc + curr.count, 0) || 0;
  const doneTasks = stats?.find(s => s._id === 'Done')?.count || 0;
  const progressTasks = stats?.find(s => s._id === 'In Progress')?.count || 0;
  const todoTasks = stats?.find(s => s._id === 'To Do')?.count || 0;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div className="navbar" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Welcome to your command center.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp size={18} color="var(--success)" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>+12% productivity</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '14px' }}>
              <Layers size={24} color="white" />
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Active Projects</span>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{projects.length}</div>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(160, 160, 160, 0.1)', padding: '0.75rem', borderRadius: '14px' }}>
              <CircleDashed size={24} color="var(--text-muted)" />
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Pending Tasks</span>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{todoTasks}</div>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '14px' }}>
              <Clock size={24} color="var(--text-muted)" />
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>In Progress</span>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{progressTasks}</div>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(0, 255, 149, 0.1)', padding: '0.75rem', borderRadius: '14px' }}>
              <CheckCircle2 size={24} color="var(--success)" />
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Completed</span>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{doneTasks}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}> / {totalTasks}</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Featured Projects</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}>View all</span>
          </div>
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              <p>No projects yet. Time to create some magic! ✨</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {projects.slice(0, 4).map(project => (
                <div key={project._id} className="stat-item" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', height: '2.7rem', overflow: 'hidden', lineHeight: '1.5' }}>{project.description || 'No description'}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }}></div>
                    Admin: {project.admin?.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Live Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { text: 'Marketing redesign launched', time: '2h ago', icon: <Layers size={16} />, color: 'var(--primary)' },
              { text: 'Review component architecture', time: '4h ago', icon: <CheckCircle2 size={16} />, color: 'var(--success)' },
              { text: 'Sarah joined Zenith project', time: '1d ago', icon: <User size={16} />, color: 'var(--secondary)' },
              { text: 'Database optimization complete', time: '2d ago', icon: <Clock size={16} />, color: 'var(--accent)' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  width: 40, 
                  height: 40, 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: activity.color,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {activity.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.2rem' }}>{activity.text}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;

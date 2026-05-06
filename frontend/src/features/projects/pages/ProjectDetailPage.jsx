import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../../tasks/hooks/useTasks';
import { useAuth } from '../../auth/hooks/useAuth';
import { Plus, ChevronLeft, Calendar, User, Trash2, Layout } from 'lucide-react';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, getProject, error: projectError } = useProjects();
  const { tasks, getTasksByProject, createTask, updateTask, deleteTask, error: taskError } = useTasks();
  const { user } = useAuth();
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do', assignedTo: '' });

  useEffect(() => {
    getProject(id);
    getTasksByProject(id);
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const taskData = { ...newTask, project: id };
    if (taskData.assignedTo === '') delete taskData.assignedTo;
    
    await createTask(taskData);
    setNewTask({ title: '', description: '', status: 'To Do', assignedTo: '' });
    setShowTaskModal(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div className="navbar" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/projects')} style={{ background: 'var(--bg-side)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '14px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{currentProject?.title}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>{currentProject?.description}</p>
          </div>
        </div>
        {user?.role === 'Admin' && (
          <button onClick={() => setShowTaskModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Plus size={22} />
            Create Task
          </button>
        )}
      </div>

      {(projectError || taskError) && (
        <div style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.08)', padding: '1rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid rgba(255, 77, 77, 0.2)', textAlign: 'center' }}>
          {projectError || taskError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {['To Do', 'In Progress', 'Done'].map(status => (
          <div key={status} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(10,10,10,0.4)', minHeight: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: status === 'To Do' ? 'var(--text-muted)' : status === 'In Progress' ? 'var(--secondary)' : 'var(--success)' }}></div>
                <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{status}</h3>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                {tasks.filter(t => t.status === status).length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task._id} className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-side)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{task.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>{task.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                        <User size={14} color="var(--primary)" />
                        {task.assignedTo?.name || 'Unassigned'}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white', fontWeight: '700' }}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                              deleteTask(task._id);
                            }
                          }} 
                          style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }} 
                          onMouseOver={e => e.currentTarget.style.color = 'var(--danger)'} 
                          onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status === status).length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed rgba(255,255,255,0.03)', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showTaskModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.3s ease-out' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>New Task</h2>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>TASK TITLE</label>
                <input type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required placeholder="What needs to be done?" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>DESCRIPTION</label>
                <textarea rows="3" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} placeholder="Detailed instructions..." />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowTaskModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1rem', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '700' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>Add Task</button>
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

export default ProjectDetailPage;

import React, { useState, useEffect } from 'react';
import { 
  Users, ShieldCheck, BookOpen, FileCheck, FileText, 
  Database, Activity, Plus, Edit2, Trash2, RefreshCw, 
  Search, CheckCircle2, AlertCircle, X, ExternalLink,
  Layers, Lock, Sparkles, ChevronRight
} from 'lucide-react';
import { api, API_ENDPOINTS } from './services/api';
import { seedDatabase } from './services/seedData';

const ENTITY_CONFIG = {
  roles: {
    label: 'User Roles',
    singular: 'Role',
    icon: ShieldCheck,
    description: 'System access roles (Admin, Instructor, Student, Auditor)',
    idKey: 'role_id',
    columns: [
      { key: 'role_id', label: 'ID', width: '80px' },
      { key: 'role_name', label: 'Role Name' }
    ],
    fields: [
      { name: 'role_name', label: 'Role Name', type: 'text', placeholder: 'e.g. Student, Instructor, Admin', required: true }
    ]
  },
  users: {
    label: 'Users Directory',
    singular: 'User',
    icon: Users,
    description: 'Registered users with assigned roles & privacy credentials',
    idKey: 'user_id',
    columns: [
      { key: 'user_id', label: 'ID', width: '70px' },
      { key: 'full_name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'role_id', label: 'Role ID' }
    ],
    fields: [
      { name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'e.g. John Doe', required: true },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. jdoe@institution.edu', required: true },
      { name: 'role_id', label: 'Role ID', type: 'number', placeholder: '1 for Admin, 2 for Instructor, 3 for Student', required: true },
      { name: 'password_hash', label: 'Password / Hash', type: 'password', placeholder: 'Enter password or hash', required: true }
    ]
  },
  courses: {
    label: 'Course Offerings',
    singular: 'Course',
    icon: BookOpen,
    description: 'Academic courses managed by assigned faculty instructors',
    idKey: 'course_id',
    columns: [
      { key: 'course_id', label: 'ID', width: '70px' },
      { key: 'course_name', label: 'Course Name' },
      { key: 'instructor_id', label: 'Instructor User ID' }
    ],
    fields: [
      { name: 'course_name', label: 'Course Name', type: 'text', placeholder: 'e.g. CSIT321 - Enterprise Application Dev', required: true },
      { name: 'instructor_id', label: 'Instructor ID (User ID)', type: 'number', placeholder: 'e.g. 2', required: true }
    ]
  },
  assessments: {
    label: 'Course Assessments',
    singular: 'Assessment',
    icon: FileCheck,
    description: 'Exams and submissions tied to data retention policies',
    idKey: 'assessment_id',
    columns: [
      { key: 'assessment_id', label: 'ID', width: '70px' },
      { key: 'title', label: 'Assessment Title' },
      { key: 'course_id', label: 'Course ID' },
      { key: 'retention_days', label: 'Retention Period' }
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', placeholder: 'e.g. Midterm Coding Assessment', required: true },
      { name: 'course_id', label: 'Course ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'retention_days', label: 'Retention Days', type: 'number', placeholder: 'e.g. 180', required: true }
    ]
  },
  consentNotices: {
    label: 'Consent Notices',
    singular: 'Notice',
    icon: FileText,
    description: 'Privacy collection statements required by privacy compliance acts',
    idKey: 'notice_id',
    columns: [
      { key: 'notice_id', label: 'ID', width: '70px' },
      { key: 'assessment_id', label: 'Assessment ID' },
      { key: 'data_collected', label: 'Data Collected' },
      { key: 'purpose', label: 'Purpose' },
      { key: 'stored_in', label: 'Storage Target' },
      { key: 'retention_days', label: 'Retention Days' }
    ],
    fields: [
      { name: 'assessment_id', label: 'Assessment ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'data_collected', label: 'Data Collected', type: 'text', placeholder: 'e.g. Student Code, IP Address, Timestamp', required: true },
      { name: 'purpose', label: 'Processing Purpose', type: 'text', placeholder: 'e.g. Grading and code plagiarism verification', required: true },
      { name: 'stored_in', label: 'Storage Destination', type: 'text', placeholder: 'e.g. Encrypted MySQL DB / AWS RDS', required: true },
      { name: 'retention_days', label: 'Retention Days', type: 'number', placeholder: 'e.g. 180', required: true }
    ]
  },
  consentRecords: {
    label: 'Consent Records',
    singular: 'Record',
    icon: ShieldCheck,
    description: 'Explicit student agreement or refusal audit entries',
    idKey: 'consent_id',
    columns: [
      { key: 'consent_id', label: 'ID', width: '70px' },
      { key: 'notice_id', label: 'Notice ID' },
      { key: 'student_id', label: 'Student User ID' },
      { key: 'decision', label: 'Decision' },
      { key: 'decided_at', label: 'Decided At' }
    ],
    fields: [
      { name: 'notice_id', label: 'Notice ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'student_id', label: 'Student ID (User ID)', type: 'number', placeholder: 'e.g. 3', required: true },
      { name: 'decision', label: 'Decision Status', type: 'select', options: ['AGREED', 'DECLINED'], required: true }
    ]
  },
  submissions: {
    label: 'Encrypted Submissions',
    singular: 'Submission',
    icon: Lock,
    description: 'Encrypted student works linked to verified consent records',
    idKey: 'submission_id',
    columns: [
      { key: 'submission_id', label: 'ID', width: '70px' },
      { key: 'assessment_id', label: 'Assessment ID' },
      { key: 'student_id', label: 'Student ID' },
      { key: 'consent_id', label: 'Consent Record ID' },
      { key: 'submitted_at', label: 'Submitted At' }
    ],
    fields: [
      { name: 'assessment_id', label: 'Assessment ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'student_id', label: 'Student ID', type: 'number', placeholder: 'e.g. 3', required: true },
      { name: 'consent_id', label: 'Consent ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'encrypted_data', label: 'Payload (Text will be base64 encoded)', type: 'textarea', placeholder: 'Enter student work or encrypted content', required: false }
    ]
  },
  auditLogs: {
    label: 'Audit Trail',
    singular: 'Audit Log',
    icon: Activity,
    description: 'Traceable immutable logs of security and system events',
    idKey: 'log_id',
    columns: [
      { key: 'log_id', label: 'ID', width: '70px' },
      { key: 'user_id', label: 'User ID' },
      { key: 'action', label: 'Action Taken' },
      { key: 'target', label: 'Target Entity' },
      { key: 'logged_at', label: 'Logged At' }
    ],
    fields: [
      { name: 'user_id', label: 'User ID', type: 'number', placeholder: 'e.g. 1', required: true },
      { name: 'action', label: 'Action Type', type: 'text', placeholder: 'e.g. USER_LOGIN, CONSENT_GRANTED, UPDATE_COURSE', required: true },
      { name: 'target', label: 'Target Summary', type: 'text', placeholder: 'e.g. Assessment #1 Consent Notice Published', required: true }
    ]
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const checkStatusAndFetchAll = async () => {
    setLoading(true);
    const online = await api.checkHealth();
    setBackendOnline(online);

    if (online) {
      const results = {};
      for (const key of Object.keys(ENTITY_CONFIG)) {
        try {
          const res = await api.getAll(key);
          results[key] = Array.isArray(res) ? res : [];
        } catch {
          results[key] = [];
        }
      }
      setData(results);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkStatusAndFetchAll();
    const interval = setInterval(async () => {
      const online = await api.checkHealth();
      setBackendOnline(online);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAdd = (tabKey) => {
    setEditingItem(null);
    const initial = {};
    ENTITY_CONFIG[tabKey].fields.forEach(f => {
      initial[f.name] = f.type === 'select' ? f.options[0] : '';
    });
    setFormData(initial);
    setModalOpen(true);
  };

  const handleOpenEdit = (tabKey, item) => {
    setEditingItem(item);
    const initial = { ...item };
    setFormData(initial);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = ENTITY_CONFIG[currentTab];
    if (!config) return;

    try {
      const payload = { ...formData };
      
      // Auto numeric conversions
      config.fields.forEach(f => {
        if (f.type === 'number' && payload[f.name] !== undefined) {
          payload[f.name] = parseInt(payload[f.name], 10) || 0;
        }
      });

      // Special handling for Submission encrypted_data byte array
      if (currentTab === 'submissions' && typeof payload.encrypted_data === 'string') {
        // Base64 encode if needed
        try {
          payload.encrypted_data = btoa(payload.encrypted_data);
        } catch {
          payload.encrypted_data = 'U2FtcGxlRW5jcnlwdGVkRGF0YQ==';
        }
      }

      if (editingItem) {
        const id = editingItem[config.idKey];
        await api.update(currentTab, id, payload);
        addToast(`Successfully updated ${config.singular} #${id}`, 'success');
      } else {
        await api.create(currentTab, payload);
        addToast(`Successfully created new ${config.singular}`, 'success');
      }

      setModalOpen(false);
      checkStatusAndFetchAll();
    } catch (err) {
      addToast(`Error saving: ${err.message}`, 'error');
    }
  };

  const handleDelete = async (tabKey, id) => {
    const config = ENTITY_CONFIG[tabKey];
    if (!window.confirm(`Are you sure you want to delete ${config.singular} ID #${id}?`)) return;

    try {
      await api.delete(tabKey, id);
      addToast(`${config.singular} #${id} deleted successfully`, 'success');
      checkStatusAndFetchAll();
    } catch (err) {
      addToast(`Failed to delete: ${err.message}`, 'error');
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    addToast('Populating sample records into MySQL database...', 'info');
    try {
      const res = await seedDatabase();
      addToast(`Database successfully seeded! Added sample records across all tables.`, 'success');
      await checkStatusAndFetchAll();
    } catch (err) {
      addToast(`Seeding encountered error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = ENTITY_CONFIG[currentTab];
  const items = currentConfig ? (data[currentTab] || []) : [];
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-badge">
            <Lock size={22} />
          </div>
          <div className="logo-text">
            <h1>SeData Platform</h1>
            <span>CSIT321 - 3Idiots</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Main Dashboard</div>
          <div 
            className={`nav-item ${currentTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setCurrentTab('overview'); setSearchQuery(''); }}
          >
            <Layers size={18} />
            <span>Architecture & Stats</span>
          </div>

          <div className="nav-section-title">Academic & Users</div>
          {['roles', 'users', 'courses', 'assessments'].map(key => {
            const conf = ENTITY_CONFIG[key];
            const Icon = conf.icon;
            const count = (data[key] || []).length;
            return (
              <div 
                key={key} 
                className={`nav-item ${currentTab === key ? 'active' : ''}`}
                onClick={() => { setCurrentTab(key); setSearchQuery(''); }}
              >
                <Icon size={18} />
                <span>{conf.label}</span>
                {count > 0 && <span className="badge">{count}</span>}
              </div>
            );
          })}

          <div className="nav-section-title">Privacy & Compliance</div>
          {['consentNotices', 'consentRecords', 'submissions', 'auditLogs'].map(key => {
            const conf = ENTITY_CONFIG[key];
            const Icon = conf.icon;
            const count = (data[key] || []).length;
            return (
              <div 
                key={key} 
                className={`nav-item ${currentTab === key ? 'active' : ''}`}
                onClick={() => { setCurrentTab(key); setSearchQuery(''); }}
              >
                <Icon size={18} />
                <span>{conf.label}</span>
                {count > 0 && <span className="badge">{count}</span>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="db-status-pill">
            <div className={`status-dot ${backendOnline ? 'online' : 'offline'}`} />
            <div>
              <div style={{ fontWeight: 600, color: '#f8fafc' }}>
                {backendOnline ? 'MySQL Connected' : 'Backend Connecting'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                sedata @ 127.0.0.1:3306
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-wrapper">
        {/* Top Header Bar */}
        <header className="topbar">
          <div className="topbar-title">
            <h2>{currentTab === 'overview' ? 'System Overview & ERD Model' : currentConfig?.label}</h2>
            <p>{currentTab === 'overview' ? 'Comprehensive Data Privacy Compliance & Academic CRUD Suite' : currentConfig?.description}</p>
          </div>

          <div className="topbar-actions">
            <button className="btn btn-secondary btn-sm" onClick={checkStatusAndFetchAll} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button className="btn btn-secondary btn-sm" onClick={handleSeed} disabled={loading} title="Populate sample demo data across all tables in MySQL">
              <Sparkles size={15} color="#2563eb" />
              <span>Seed Demo Data</span>
            </button>

            {currentTab !== 'overview' && (
              <button className="btn btn-primary btn-sm" onClick={() => handleOpenAdd(currentTab)}>
                <Plus size={16} />
                <span>New {currentConfig?.singular}</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="content-area">
          {/* Quick Stats Grid */}
          <div className="stats-grid">
            {Object.keys(ENTITY_CONFIG).slice(0, 4).map(key => {
              const conf = ENTITY_CONFIG[key];
              const Icon = conf.icon;
              const count = (data[key] || []).length;
              return (
                <div key={key} className="stat-card" onClick={() => setCurrentTab(key)} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    <Icon size={20} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{count}</div>
                    <div className="stat-label">{conf.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View Tab: Overview */}
          {currentTab === 'overview' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Database Connection Status Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Database size={22} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Database sedata Connection</h3>
                    <span className="badge-pill badge-green" style={{ background: '#064e3b', color: '#6ee7b7' }}>
                      Active MySQL 8.x
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', maxWidth: '650px' }}>
                    Spring Boot backend is configured with Hibernate auto-DDL to synchronize all 8 entities with the local MySQL database <span className="code-badge" style={{ color: '#38bdf8', background: '#334155' }}>sedata</span> hosted on <span className="code-badge" style={{ color: '#38bdf8', background: '#334155' }}>127.0.0.1:3306</span>.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary" onClick={handleSeed}>
                    <Sparkles size={16} />
                    <span>Seed Demo Records</span>
                  </button>
                </div>
              </div>

              {/* Data Flow & Table Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px'
              }}>
                {Object.keys(ENTITY_CONFIG).map(key => {
                  const conf = ENTITY_CONFIG[key];
                  const Icon = conf.icon;
                  const count = (data[key] || []).length;
                  return (
                    <div 
                      key={key} 
                      className="table-card" 
                      style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      onClick={() => setCurrentTab(key)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ padding: '8px', background: '#f1f5f9', borderRadius: 'var(--radius-md)', color: '#2563eb' }}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a' }}>{conf.label}</h4>
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Table: <code className="code-badge">tbl{key === 'consentNotices' ? 'consent_notice' : key === 'consentRecords' ? 'consent_record' : key === 'auditLogs' ? 'auditlog' : key.slice(0, -1)}</code></span>
                          </div>
                        </div>
                        <span className="badge-pill badge-blue" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          {count}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px', minHeight: '38px' }}>
                        {conf.description}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, alignItems: 'center', gap: '4px' }}>
                        <span>Open CRUD table</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CRUD Table View */
            <div className="table-card">
              <div className="table-header">
                <div className="search-box">
                  <Search size={16} color="#64748b" />
                  <input 
                    type="text" 
                    placeholder={`Search ${currentConfig.label}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> records
                  </span>
                </div>
              </div>

              <div className="table-responsive">
                {filteredItems.length === 0 ? (
                  <div className="empty-state">
                    <Database size={40} />
                    <h4>No records found in {currentConfig.label}</h4>
                    <p style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                      {items.length === 0 ? 'Table is currently empty in MySQL. Click "+ New" or "Seed Demo Data" above!' : 'No items match your search filter.'}
                    </p>
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        {currentConfig.columns.map(col => (
                          <th key={col.key} style={{ width: col.width }}>{col.label}</th>
                        ))}
                        <th style={{ width: '100px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, idx) => {
                        const id = item[currentConfig.idKey] || idx;
                        return (
                          <tr key={id}>
                            {currentConfig.columns.map(col => {
                              const val = item[col.key];
                              // Custom styling for specific column types
                              if (col.key === 'decision') {
                                return (
                                  <td key={col.key}>
                                    <span className={`badge-pill ${val === 'AGREED' ? 'badge-green' : 'badge-red'}`}>
                                      {val}
                                    </span>
                                  </td>
                                );
                              }
                              if (col.key.endsWith('_at') || col.key === 'logged_at') {
                                return (
                                  <td key={col.key} style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                    {val ? new Date(val).toLocaleString() : '-'}
                                  </td>
                                );
                              }
                              if (col.key === 'role_name') {
                                return (
                                  <td key={col.key}>
                                    <span className="badge-pill badge-purple">{val}</span>
                                  </td>
                                );
                              }
                              if (col.key.endsWith('_id') || col.key === 'retention_days') {
                                return (
                                  <td key={col.key}>
                                    <span className="code-badge">{val}</span>
                                  </td>
                                );
                              }
                              return (
                                <td key={col.key} style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {val !== null && val !== undefined ? String(val) : '-'}
                                </td>
                              );
                            })}
                            <td style={{ textAlign: 'right' }}>
                              <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                <button 
                                  className="action-btn edit" 
                                  title="Edit item"
                                  onClick={() => handleOpenEdit(currentTab, item)}
                                >
                                  <Edit2 size={15} />
                                </button>
                                <button 
                                  className="action-btn delete" 
                                  title="Delete item"
                                  onClick={() => handleDelete(currentTab, id)}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Modal */}
      {modalOpen && currentConfig && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? `Edit ${currentConfig.singular}` : `Create New ${currentConfig.singular}`}</h3>
              <button 
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {currentConfig.fields.map(field => (
                  <div key={field.name} className="form-group">
                    <label>
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select 
                        className="form-control"
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        required={field.required}
                      >
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        required={field.required}
                      />
                    ) : (
                      <input 
                        type={field.type}
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.name] !== undefined ? formData[field.name] : ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

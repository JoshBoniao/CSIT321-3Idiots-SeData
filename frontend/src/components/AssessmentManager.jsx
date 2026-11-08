import React, { useState } from 'react';
import { assessmentApi } from '../services/api';

export default function AssessmentManager({ assessments, courses, onRefresh, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', course_id: '', retention_days: 30 });
  const [searchTerm, setSearchTerm] = useState('');

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      title: '',
      course_id: courses[0]?.course_id || '',
      retention_days: 30,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.assessment_id);
    setForm({
      title: item.title,
      course_id: item.course_id?.course_id || '',
      retention_days: item.retention_days,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const payload = {
      title: form.title.trim(),
      retention_days: parseInt(form.retention_days) || 30,
      course_id: parseInt(form.course_id) || 0,
    };

    try {
      if (editingId) {
        await assessmentApi.update(editingId, payload);
        showToast('Assessment updated successfully');
      } else {
        await assessmentApi.create(payload);
        showToast('Assessment created successfully');
      }
      setModalOpen(false);
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;
    try {
      await assessmentApi.delete(id);
      showToast('Assessment deleted');
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredAssessments = assessments.filter((a) =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.assessment_id?.toString().includes(searchTerm) ||
    a.course_id?.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Assessments</h2>
          <p className="text-sm text-slate-500">Configure exams, tasks, course mappings, and data retention policies</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
          />
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            <span>+ New Assessment</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Assessment ID</th>
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Linked Course</th>
              <th className="px-6 py-3 font-semibold">Retention Period</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAssessments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                  No assessments found. Click <strong>"+ New Assessment"</strong> to add one.
                </td>
              </tr>
            ) : (
              filteredAssessments.map((a) => (
                <tr key={a.assessment_id} className="hover:bg-slate-50/70 transition">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-700">
                    #{a.assessment_id}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {a.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {(() => {
                      const cid = typeof a.course_id === 'object' ? a.course_id?.course_id : a.course_id;
                      const matched = courses.find((c) => c.course_id === cid);
                      return matched ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">
                          {matched.course_name} (ID: #{matched.course_id})
                        </span>
                      ) : cid ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          Course #{cid}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">None assigned</span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {a.retention_days} days
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEditModal(a)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.assessment_id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Assessment' : 'Create New Assessment'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finals Hands-on Exam"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Associated Course
                </label>
                <select
                  value={form.course_id}
                  onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                >
                  <option value="">-- None / Select Course --</option>
                  {courses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>
                      #{c.course_id} - {c.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Retention Days
                </label>
                <input
                  type="number"
                  required
                  placeholder="30"
                  value={form.retention_days}
                  onChange={(e) => setForm({ ...form, retention_days: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm transition"
                >
                  {editingId ? 'Save Changes' : 'Create Assessment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

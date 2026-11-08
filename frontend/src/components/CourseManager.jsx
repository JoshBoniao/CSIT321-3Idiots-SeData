import React, { useState } from 'react';
import { courseApi } from '../services/api';

export default function CourseManager({ courses, onRefresh, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ course_name: '', instructor_id: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ course_name: '', instructor_id: '' });
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingId(course.course_id);
    setForm({
      course_name: course.course_name,
      instructor_id: course.instructor_id,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.course_name.trim()) return;

    const payload = {
      course_name: form.course_name.trim(),
      instructor_id: parseInt(form.instructor_id) || 1,
    };

    try {
      if (editingId) {
        await courseApi.update(editingId, payload);
        showToast('Course updated successfully');
      } else {
        await courseApi.create(payload);
        showToast('Course created successfully');
      }
      setModalOpen(false);
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseApi.delete(id);
      showToast('Course deleted');
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.course_id?.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Courses</h2>
          <p className="text-sm text-slate-500">View and manage all registered academic courses</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
          />
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            <span>+ New Course</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Course ID</th>
              <th className="px-6 py-3 font-semibold">Course Name</th>
              <th className="px-6 py-3 font-semibold">Instructor ID</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                  No courses found. Click <strong>"+ New Course"</strong> to add one.
                </td>
              </tr>
            ) : (
              filteredCourses.map((c) => (
                <tr key={c.course_id} className="hover:bg-slate-50/70 transition">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-700">
                    #{c.course_id}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {c.course_name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">
                      ID: {c.instructor_id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => openEditModal(c)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.course_id)}
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
              {editingId ? 'Edit Course' : 'Create New Course'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Systems Architecture"
                  value={form.course_name}
                  onChange={(e) => setForm({ ...form, course_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Instructor ID
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 101"
                  value={form.instructor_id}
                  onChange={(e) => setForm({ ...form, instructor_id: e.target.value })}
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
                  {editingId ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

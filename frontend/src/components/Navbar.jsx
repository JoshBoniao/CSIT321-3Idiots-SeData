import React from 'react';

export default function Navbar({ activeTab, setActiveTab, courseCount, assessmentCount, isOnline, onRefresh }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            S
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 leading-none">SeData</h1>
            <span className="text-xs text-slate-400">Course & Assessment Hub</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="text-slate-600 font-medium">
              {isOnline ? 'API Connected' : 'Backend Offline'}
            </span>
          </div>
          <button
            onClick={onRefresh}
            className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded transition"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('courses')}
          className={`py-3 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'courses'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span>Courses</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {courseCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('assessments')}
          className={`py-3 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${
            activeTab === 'assessments'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span>Assessments</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {assessmentCount}
          </span>
        </button>
      </div>
    </header>
  );
}

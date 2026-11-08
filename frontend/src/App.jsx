import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CourseManager from './components/CourseManager';
import AssessmentManager from './components/AssessmentManager';
import { courseApi, assessmentApi } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      const [cData, aData] = await Promise.all([
        courseApi.getAll(),
        assessmentApi.getAll(),
      ]);
      setCourses(cData);
      setAssessments(aData);
      setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        courseCount={courses.length}
        assessmentCount={assessments.length}
        isOnline={isOnline}
        onRefresh={loadData}
      />

      {!isOnline && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 text-center">
          Backend currently offline at <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">http://localhost:8080</code>.
          Start MySQL in XAMPP and run your Spring Boot application to connect.
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'courses' ? (
          <CourseManager
            courses={courses}
            onRefresh={loadData}
            showToast={showToast}
          />
        ) : (
          <AssessmentManager
            assessments={assessments}
            courses={courses}
            onRefresh={loadData}
            showToast={showToast}
          />
        )}
      </main>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-50 transition-all ${
            toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

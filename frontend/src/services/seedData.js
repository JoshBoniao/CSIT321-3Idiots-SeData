import { api } from './api';

export const sampleRoles = [
  { role_name: 'Administrator' },
  { role_name: 'Instructor' },
  { role_name: 'Student' },
  { role_name: 'Privacy Auditor' }
];

export const sampleUsers = [
  { role_id: 1, full_name: 'Prof. Alan Turing', email: 'aturing@university.edu', password_hash: '$2a$12$eX8zH92...' },
  { role_id: 2, full_name: 'Dr. Ada Lovelace', email: 'alovelace@university.edu', password_hash: '$2a$12$K19mX01...' },
  { role_id: 3, full_name: 'John Doe', email: 'jdoe@student.edu', password_hash: '$2a$12$P28qR77...' },
  { role_id: 3, full_name: 'Jane Smith', email: 'jsmith@student.edu', password_hash: '$2a$12$M93tY44...' },
  { role_id: 4, full_name: 'Grace Hopper', email: 'ghopper@audit.edu', password_hash: '$2a$12$V33bN66...' }
];

export const sampleCourses = [
  { instructor_id: 2, course_name: 'CSIT321 - Enterprise Application Development' },
  { instructor_id: 2, course_name: 'CSIT314 - Information Assurance & Privacy' },
  { instructor_id: 1, course_name: 'CSIT225 - Advanced Database Management' }
];

export const sampleAssessments = [
  { course_id: 1, retention_days: 180, title: 'Midterm Practical Exam: REST API Implementation' },
  { course_id: 1, retention_days: 365, title: 'Final Project Capstone Artifacts' },
  { course_id: 2, retention_days: 90, title: 'Quiz 1: Data Privacy Act Compliance Quiz' }
];

export const sampleConsentNotices = [
  {
    assessment_id: 1,
    data_collected: 'Full Name, Student ID, Source Code Submissions, IP Logs',
    purpose: 'Academic evaluation and automated plagiarism integrity verification',
    stored_in: 'Encrypted University AWS RDS MySQL cluster (AP-Southeast-1)',
    retention_days: 180,
    created_at: new Date().toISOString()
  },
  {
    assessment_id: 2,
    data_collected: 'Final Code Artifacts, Git Commit Histories, Presentation Recordings',
    purpose: 'Capstone grading, ABET/CHED accreditation evidence',
    stored_in: 'Secure Institutional Cold Storage & MariaDB/MySQL',
    retention_days: 365,
    created_at: new Date().toISOString()
  }
];

export const sampleConsentRecords = [
  { notice_id: 1, student_id: 3, decision: 'AGREED', decided_at: new Date().toISOString() },
  { notice_id: 1, student_id: 4, decision: 'AGREED', decided_at: new Date().toISOString() },
  { notice_id: 2, student_id: 3, decision: 'AGREED', decided_at: new Date().toISOString() }
];

export const sampleSubmissions = [
  {
    assessment_id: 1,
    student_id: 3,
    consent_id: 1,
    encrypted_data: 'U2VjdXJlRW5jcnlwdGVkU3VibWlzc2lvblBhY2thZ2VfQ1NJVDMyMQ==', // Base64
    submitted_at: new Date().toISOString()
  },
  {
    assessment_id: 1,
    student_id: 4,
    consent_id: 2,
    encrypted_data: 'U2VjdXJlRW5jcnlwdGVkU3VibWlzc2lvblBhY2thZ2VfQ1NJVDMyMV9TdHVkZW50NA==',
    submitted_at: new Date().toISOString()
  }
];

export const sampleAuditLogs = [
  { user_id: 1, action: 'SYSTEM_BOOT', target: 'Database Initialized (MySQL sedata)', logged_at: new Date().toISOString() },
  { user_id: 1, action: 'CREATE_NOTICE', target: 'Assessment #1 Consent Notice Published', logged_at: new Date().toISOString() },
  { user_id: 3, action: 'CONSENT_GRANTED', target: 'Student #3 Accepted Notice #1', logged_at: new Date().toISOString() },
  { user_id: 3, action: 'SUBMISSION_STORED', target: 'Encrypted Submission ID #1 Uploaded', logged_at: new Date().toISOString() }
];

export async function seedDatabase() {
  const results = { roles: 0, users: 0, courses: 0, assessments: 0, notices: 0, records: 0, submissions: 0, logs: 0 };
  
  for (const r of sampleRoles) {
    try { await api.create('roles', r); results.roles++; } catch (e) { console.warn('Role seed error:', e); }
  }
  for (const u of sampleUsers) {
    try { await api.create('users', u); results.users++; } catch (e) { console.warn('User seed error:', e); }
  }
  for (const c of sampleCourses) {
    try { await api.create('courses', c); results.courses++; } catch (e) { console.warn('Course seed error:', e); }
  }
  for (const a of sampleAssessments) {
    try { await api.create('assessments', a); results.assessments++; } catch (e) { console.warn('Assessment seed error:', e); }
  }
  for (const n of sampleConsentNotices) {
    try { await api.create('consentNotices', n); results.notices++; } catch (e) { console.warn('Notice seed error:', e); }
  }
  for (const cr of sampleConsentRecords) {
    try { await api.create('consentRecords', cr); results.records++; } catch (e) { console.warn('Record seed error:', e); }
  }
  for (const s of sampleSubmissions) {
    try { await api.create('submissions', s); results.submissions++; } catch (e) { console.warn('Submission seed error:', e); }
  }
  for (const l of sampleAuditLogs) {
    try { await api.create('auditLogs', l); results.logs++; } catch (e) { console.warn('Log seed error:', e); }
  }
  return results;
}

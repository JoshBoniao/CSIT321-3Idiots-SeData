const BASE_URL = 'http://localhost:8080';

export const courseApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/course`);
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/course/${id}`);
    if (!res.ok) throw new Error('Course not found');
    return res.json();
  },
  create: async (course) => {
    const res = await fetch(`${BASE_URL}/course`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    if (!res.ok) throw new Error('Failed to create course');
    return res.json();
  },
  update: async (id, course) => {
    const res = await fetch(`${BASE_URL}/course/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    if (!res.ok) throw new Error('Failed to update course');
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/course/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete course');
    return true;
  },
};

export const assessmentApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/assessment`);
    if (!res.ok) throw new Error('Failed to fetch assessments');
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/assessment/${id}`);
    if (!res.ok) throw new Error('Assessment not found');
    return res.json();
  },
  create: async (assessment) => {
    const res = await fetch(`${BASE_URL}/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assessment),
    });
    if (!res.ok) throw new Error('Failed to create assessment');
    return res.json();
  },
  update: async (id, assessment) => {
    const res = await fetch(`${BASE_URL}/assessment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assessment),
    });
    if (!res.ok) throw new Error('Failed to update assessment');
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/assessment/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete assessment');
    return true;
  },
};

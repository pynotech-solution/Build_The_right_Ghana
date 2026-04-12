export const normalizeEmail = (email = '') => email.toLowerCase().trim();

export const createSlug = (title = '') =>
  title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

export const getDashboardTitle = (activeTab) => {
  if (activeTab === 'payments') return 'Payment Methods';
  if (activeTab === 'admins') return 'Admin Directory';
  return 'Blog Management';
};

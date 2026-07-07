// User roles — must match values returned by the Django backend
export const ROLES = {
  HR_OFFICER: 'hr_officer',
  HR_DIRECTOR: 'hr_director',
  DEPARTMENT_HEAD: 'department_head',
  SENIOR_MANAGEMENT: 'senior_management',
  BOARD: 'board',
  EMPLOYEE: 'employee',
  APPLICANT: 'applicant',
  GRADUATE_TRAINEE: 'graduate_trainee',
  INTERN: 'intern',
  ADMIN: 'admin',
};

// Human-readable labels for each role — mirrors ROLE_CHOICES in the Django User model
export const ROLE_LABELS = {
  [ROLES.HR_OFFICER]:        'HR Officer',
  [ROLES.HR_DIRECTOR]:       'HR Director',
  [ROLES.DEPARTMENT_HEAD]:   'Department Head',
  [ROLES.SENIOR_MANAGEMENT]: 'Senior Management',
  [ROLES.BOARD]:             'Board of Directors',
  [ROLES.EMPLOYEE]:          'Employee',
  [ROLES.APPLICANT]:         'Job Applicant',
  [ROLES.GRADUATE_TRAINEE]:  'Graduate Trainee',
  [ROLES.INTERN]:            'Student Intern',
  [ROLES.ADMIN]:             'System Administrator',
};

// Maps a role to the dashboard route it lands on after login
export const ROLE_DASHBOARD_MAP = {
  [ROLES.HR_OFFICER]:       '/dashboard/hr-officer',
  [ROLES.HR_DIRECTOR]:      '/dashboard/hr-director',
  [ROLES.DEPARTMENT_HEAD]:  '/dashboard/department-head',
  [ROLES.SENIOR_MANAGEMENT]:'/dashboard/senior-management',
  [ROLES.BOARD]:            '/dashboard/board',
  [ROLES.EMPLOYEE]:         '/dashboard/employee',
  [ROLES.APPLICANT]:        '/dashboard/applicant',
  [ROLES.GRADUATE_TRAINEE]: '/dashboard/graduate-trainee',
  [ROLES.INTERN]:           '/dashboard/intern',
  [ROLES.ADMIN]:            '/dashboard/admin',
};

// Role groups mirroring the backend's DRF permission classes (apps/*/permissions.py) —
// used by frontend pages to show/hide create/edit/approve controls consistently
// with what the corresponding API call would actually allow.
export const IS_ADMIN = [ROLES.ADMIN];
export const IS_HR_OR_ADMIN = [ROLES.ADMIN, ROLES.HR_OFFICER, ROLES.HR_DIRECTOR];
export const IS_MANAGEMENT = [ROLES.ADMIN, ROLES.HR_DIRECTOR, ROLES.SENIOR_MANAGEMENT, ROLES.BOARD];
export const IS_DEPARTMENT_HEAD_OR_ABOVE = [
  ROLES.ADMIN, ROLES.HR_OFFICER, ROLES.HR_DIRECTOR,
  ROLES.DEPARTMENT_HEAD, ROLES.SENIOR_MANAGEMENT, ROLES.BOARD,
];

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const TOKEN_KEY = 'hrms_access_token';
export const REFRESH_TOKEN_KEY = 'hrms_refresh_token';
export const USER_KEY = 'hrms_user';

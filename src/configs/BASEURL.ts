const url = process.env.REACT_APP_BASE_URL;

export const API_ROUTE = {
  USERS: `${url}/api/users`,
  NOTIFICATIONS: `${url}/api/notifications`,
  COURSES: `${url}/api/courses`,
  FILES: `${url}/api/files`,
  COURSE: `${url}/api/courses`,
  SEARCH_IN_COURSE: `${url}/api/search`,
  MESSAGE: `${url}/api/message`,
};

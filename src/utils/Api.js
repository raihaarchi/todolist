import * as axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const getTasks = (request) => {
  const completedTask = request.completed ? '&active=true' : '&active=false';
  const pageTaskAPI = `/tasks?_expand=icon&_limit=${request.nextPage}&_sort=favorite,`;
  const filter = request.filtering ? `&iconId=${request.filtering}` : '';
  const fetchTasks = `${pageTaskAPI}${request.sorting}&_order=desc${completedTask}${filter}${request.like || ''}`;
  const req = api.get(fetchTasks);
  return req;
};

export const addTask = (requestBody) => {
  const req = api.post('/tasks', { ...requestBody });
  return req;
};

export const deleteTask = (id) => {
  api.delete(`/tasks/${id}`);
};

export const changeTask = (id, data) => {
  const req = api.patch(`/tasks/${id}`, data);
  return req;
};

export const getCategories = (defaultCateg, id = '') => {
  const defaultCategories = defaultCateg ? `?default=${defaultCateg}` : '';
  const req = api.get(`/icons/${id}${defaultCategories}`)
  return req;
};

export const changeCategories = (id,data) => {
 const req = api.patch(`/icons/${id}`, data);
 return req;
};

export const addCategories = (dataCreateCategory) => {
  api.post('/icons/', { ...dataCreateCategory })
};

export const deleteCategories = (id) => {
  api.delete(`/icons/${id}`);
};

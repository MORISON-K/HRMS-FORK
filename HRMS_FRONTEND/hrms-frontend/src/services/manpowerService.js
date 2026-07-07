import api from './api';
import { createCrudService } from './apiServiceFactory';

export const manpowerPlansService = createCrudService('manpower/plans');
manpowerPlansService.approve = async (id, body) => {
  const { data } = await api.post(`/manpower/plans/${id}/approve/`, body);
  return data;
};

export const establishmentPostsService = createCrudService('manpower/posts');

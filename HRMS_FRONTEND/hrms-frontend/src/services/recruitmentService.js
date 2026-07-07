import api from './api';
import { createCrudService } from './apiServiceFactory';

export const jobsService = createCrudService('recruitment/jobs');

export const applicationsService = createCrudService('recruitment/applications');
applicationsService.create = async (formData) => {
  const { data } = await api.post('/recruitment/applications/', formData, {
    headers: { 'Content-Type': undefined },
  });
  return data;
};
applicationsService.updateStatus = async (id, body) => {
  const { data } = await api.patch(`/recruitment/applications/${id}/status/`, body);
  return data;
};

export const interviewsService = createCrudService('recruitment/interviews');
export const offersService = createCrudService('recruitment/offers');

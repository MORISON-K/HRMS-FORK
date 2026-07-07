import api from './api';
import { createCrudService } from './apiServiceFactory';

export const trainingProgramsService = createCrudService('trainees/programs');
export const traineesService = createCrudService('trainees');

export const traineeAssessmentsService = {
  async list(traineeId) {
    const { data } = await api.get(`/trainees/${traineeId}/assessments/`);
    return Array.isArray(data) ? { results: data, count: data.length } : data;
  },
  async create(traineeId, payload) {
    const { data } = await api.post(`/trainees/${traineeId}/assessments/`, { ...payload, trainee: traineeId });
    return data;
  },
};

export const traineeCoursesService = {
  async list(traineeId) {
    const { data } = await api.get(`/trainees/${traineeId}/courses/`);
    return Array.isArray(data) ? { results: data, count: data.length } : data;
  },
  async create(traineeId, payload) {
    const { data } = await api.post(`/trainees/${traineeId}/courses/`, { ...payload, trainee: traineeId });
    return data;
  },
};

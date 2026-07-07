import { createCrudService } from './apiServiceFactory';

export const cyclesService = createCrudService('evaluation/cycles');
export const kpisService = createCrudService('evaluation/kpis');
export const reviewsService = createCrudService('evaluation/reviews');
export const jobEvaluationsService = createCrudService('evaluation/job-evaluations');

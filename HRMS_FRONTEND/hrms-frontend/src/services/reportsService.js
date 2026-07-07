import api from './api';

export const reportsService = {
  async listReports(params) {
    const { data } = await api.get('/reports/', { params });
    return Array.isArray(data) ? { results: data, count: data.length } : data;
  },
  async getHeadcount() {
    const { data } = await api.get('/reports/headcount/');
    return data;
  },
  async getLeave(year) {
    const { data } = await api.get('/reports/leave/', { params: year ? { year } : undefined });
    return data;
  },
  async getRecruitment() {
    const { data } = await api.get('/reports/recruitment/');
    return data;
  },
};

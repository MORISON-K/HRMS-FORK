import api from './api';

/**
 * Builds a thin CRUD wrapper around a DRF list/detail resource.
 * Module services extend the returned object with any extra action endpoints
 * (e.g. approve/status) specific to that resource.
 */
export function createCrudService(resourcePath) {
  const base = `/${resourcePath}/`;

  return {
    async list(params) {
      const { data } = await api.get(base, { params });
      return Array.isArray(data) ? { results: data, count: data.length } : data;
    },

    async get(id) {
      const { data } = await api.get(`${base}${id}/`);
      return data;
    },

    async create(payload) {
      const { data } = await api.post(base, payload);
      return data;
    },

    async update(id, payload) {
      const { data } = await api.patch(`${base}${id}/`, payload);
      return data;
    },

    async remove(id) {
      await api.delete(`${base}${id}/`);
    },
  };
}

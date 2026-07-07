import { useCallback, useEffect, useState } from 'react';

/**
 * Fetches a list resource on mount and whenever `params` changes.
 * `service` must expose a `list(params)` method returning { results, count }.
 */
export function useApiResource(service, params) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params || {});

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.list(params);
      setData(res.results || []);
      setCount(res.count ?? (res.results || []).length);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load data.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, paramsKey]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, count, loading, error, refetch };
}

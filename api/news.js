module.exports = async (req, res) => {
  const { endpoint, ...params } = req.query;
  const apiKey = process.env.REACT_APP_KEY_NEWS;

  if (!endpoint) {
    return res.status(400).json({ status: 'error', message: 'Missing endpoint parameter' });
  }

  // Use a more robust way to handle fetch if not available globally
  let fetchInstance;
  if (typeof fetch === 'function') {
    fetchInstance = fetch;
  } else {
    const nodeFetch = await import('node-fetch');
    fetchInstance = nodeFetch.default;
  }

  const queryParams = new URLSearchParams({ ...params, apiKey }).toString();
  const url = `https://newsapi.org/v2/${endpoint}?${queryParams}`;

  try {
    const response = await fetchInstance(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

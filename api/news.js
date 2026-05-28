module.exports = async (req, res) => {
  const { endpoint, ...params } = req.query;
  // Use NEWS_API_KEY (backend) or REACT_APP_KEY_NEWS (fallback/local)
  const apiKey = process.env.NEWS_API_KEY || process.env.REACT_APP_KEY_NEWS;

  if (!endpoint) {
    return res.status(400).json({ status: 'error', message: 'Missing endpoint parameter' });
  }

  const queryParams = new URLSearchParams({ ...params, apiKey }).toString();
  const url = `https://newsapi.org/v2/${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'JournalApp/1.0',
        'X-Api-Key': apiKey
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

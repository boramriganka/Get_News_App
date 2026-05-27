const newsProxy = require('../api/news');

module.exports = function(app) {
  app.get('/api/news', async (req, res) => {
    try {
      await newsProxy(req, res);
    } catch (error) {
      console.error('Proxy Error in setupProxy:', error);
      res.status(500).json({ status: 'error', message: 'Proxy Error' });
    }
  });
};

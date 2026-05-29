const crypto = require('crypto');

const cache = new Map();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(405).json({ error: 'Summarisation unconfigured' });
  }

  const { title, description, content, url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing article URL' });
  }

  const urlHash = crypto.createHash('md5').update(url).digest('hex');

  if (cache.has(urlHash)) {
    return res.status(200).json({ summary: cache.get(urlHash) });
  }

  const cleanArticleContent = (text) => {
    if (!text) return '';
    // Remove [+N chars] or [+N char]
    return text.replace(/\[\+\d+ chars?\]/g, '').trim().substring(0, 1500);
  };

  const cleanedContent = cleanArticleContent(content);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: "You are a concise news summariser. Given an article's title, description, and body, return a summary in exactly 3 bullet points. Each bullet must be one sentence, under 20 words. Be factual. No preamble. No conclusion. Output format: bullet list only.",
        messages: [
          {
            role: 'user',
            content: `Title: ${title}\nDescription: ${description}\nContent: ${cleanedContent}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(500).json({ error: "Summary unavailable" });
    }

    const data = await response.json();
    const summary = data.content[0].text;

    cache.set(urlHash, summary);

    res.status(200).json({ summary });
  } catch (error) {
    console.error('Summarisation error:', error);
    res.status(500).json({ error: "Summary unavailable" });
  }
};

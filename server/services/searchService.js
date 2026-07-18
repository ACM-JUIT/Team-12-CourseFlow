const axios = require('axios');

async function searchWeb(query, numResults = 5) {
  const response = await axios.post(
    'https://google.serper.dev/search',
    { q: query, num: numResults },
    { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
  );

  return response.data.organic.map(r => ({
    title: r.title,
    snippet: r.snippet,
    link: r.link
  }));
}

module.exports = { searchWeb };
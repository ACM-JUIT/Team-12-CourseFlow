const axios = require('axios');

async function searchVideos(query, maxResults = 3) {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults,
      relevanceLanguage: 'en',
      safeSearch: 'strict'
    }
  });

  return (response.data.items || []).map(item => ({
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    videoId: item.id.videoId,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    thumbnail: item.snippet.thumbnails.medium.url
  }));
}

module.exports = { searchVideos };
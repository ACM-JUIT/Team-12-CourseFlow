const { searchWeb } = require('../services/searchService');
const { searchVideos } = require('../services/videoService');
const { generateCourseContent } = require('../services/aiService');

exports.generateContent = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'topic is required' });

    const [searchResults, videos] = await Promise.all([
      searchWeb(topic),
      searchVideos(topic)
    ]);

    if (searchResults.length === 0) {
      return res.status(404).json({ error: 'No search results found for this topic' });
    }

    const courseContent = await generateCourseContent(topic, searchResults);
    courseContent.videos = videos;

    res.status(200).json(courseContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Content generation failed' });
  }
};
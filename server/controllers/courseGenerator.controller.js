const { searchWeb } = require('../services/searchService');
const { searchVideos } = require('../services/videoService');
const { generateCourseContent } = require('../services/aiService');

exports.generateContent = async (req, res) => {
  try {
    const { topic, moduleCount } = req.body;
    if (!topic) return res.status(400).json({ error: 'topic is required' });

    const count = Number(moduleCount) > 0 ? Number(moduleCount) : 5;

    const searchResults = await searchWeb(topic);
    if (searchResults.length === 0) return res.status(404).json({ error: 'No search results found for this topic' });

    const courseContent = await generateCourseContent(topic, searchResults, count);

    // Fetch 2 relevant videos for each module individually
    const modulesWithVideos = await Promise.all(
      (courseContent.modules || []).map(async (mod) => {
        try {
          const vids = await searchVideos(`${topic} ${mod.title}`, 2);
          return { ...mod, videos: vids };
        } catch (err) {
          console.error(`Video search failed for module "${mod.title}":`, err.message);
          return { ...mod, videos: [] };
        }
      })
    );

    courseContent.modules = modulesWithVideos;

    res.status(200).json(courseContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Content generation failed' });
  }
};
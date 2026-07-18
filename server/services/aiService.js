const axios = require('axios');

async function generateCourseContent(topic, searchResults) {
  const context = searchResults
    .map((r, i) => `Source ${i + 1}: ${r.title}\n${r.snippet}`)
    .join('\n\n');

  const prompt = `You are a course content generator. Using the sources below, create structured course content on "${topic}".

${context}

Return ONLY valid JSON in this exact shape, no markdown, no commentary, no code fences:
{
  "title": "...",
  "description": "...",
  "modules": [
    { "title": "...", "chapters": ["...", "..."] }
  ]
}`;

  let response;
  try {
    response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4
      },
      { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Groq error details:', JSON.stringify(err.response?.data, null, 2));
    throw err;
  }

  console.log('Model that responded:', response.data.model);

  let raw = response.data.choices[0].message.content.trim();

  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    raw = raw.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse response:', raw);
    throw new Error('AI returned invalid JSON');
  }
}

module.exports = { generateCourseContent };
const axios = require('axios');

async function generateCourseContent(topic, searchResults, moduleCount = 5) {
  const context = searchResults
    .map((r, i) => `Source ${i + 1}: ${r.title}\n${r.snippet}`)
    .join('\n\n');

  const prompt = `You are a course content generator. Using the sources below, create structured, in-depth course content on "${topic}".

${context}

Create EXACTLY ${moduleCount} modules — not more, not fewer. Each module must have 3-5 chapters. For EACH chapter, write a "content" field with a detailed explanation of 4-6 sentences (at least 60 words) covering what the chapter teaches, key concepts, and why it matters. Do not just restate the chapter title — explain it substantively, as if writing real course material.

Return ONLY valid JSON in this exact shape, no markdown, no commentary, no code fences:
{
  "title": "...",
  "description": "...",
  "modules": [
    {
      "title": "...",
      "chapters": [
        { "title": "...", "content": "..." }
      ]
    }
  ]
}`;

  let response;
  try {
    response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 4096
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

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse response:', raw);
    throw new Error('AI returned invalid JSON');
  }

  if (Array.isArray(parsed.modules) && parsed.modules.length > moduleCount) {
    parsed.modules = parsed.modules.slice(0, moduleCount);
  }

  return parsed;
}

module.exports = { generateCourseContent };
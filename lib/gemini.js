import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function categorizeComplaint(title, description) {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });

    const prompt = `Analyze the following complaint and categorize it:

Title: ${title}
Description: ${description}

Please provide:
1. Category (one of: Infrastructure, Sanitation, Water Supply, Electricity, Roads, Public Safety, Healthcare, Education, Transportation, Environment, Other)
2. Department (the government department that should handle this find it searching online if needed)
3. Priority Level (low, medium, high, or critical)
4. Key Keywords (5-7 relevant keywords)
5. Sentiment (positive, neutral, or negative)

Respond in JSON format:
{
  "category": "string",
  "department": "string",
  "priority": "string",
  "keywords": ["string"],
  "sentiment": "string",
  "confidence": 0.95,
  "reasoning": "Brief explanation"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      return analysis;
    }

    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error categorizing complaint:', error);
    return {
      category: 'Other',
      department: 'General',
      priority: 'medium',
      keywords: [],
      sentiment: 'neutral',
      confidence: 0.5,
      reasoning: 'Manual review required',
    };
  }
}

export async function getSuggestions(partialText, context = 'complaint') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Based on this partial text: "${partialText}"

Provide 3-5 helpful suggestions to complete this ${context}. The suggestions should be:
- Relevant and specific
- Clear and concise
- Actionable

Respond as a JSON array of strings:
["suggestion 1", "suggestion 2", "suggestion 3"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON array from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const suggestions = JSON.parse(jsonMatch[0]);
      return suggestions;
    }

    return [];
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
}

export async function generateComplaintSummary(complaints) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze these complaints and provide insights:

${complaints.map((c, i) => `${i + 1}. ${c.title} - ${c.category} (${c.status})`).join('\n')}

Provide:
1. Common themes
2. Most urgent issues
3. Recommendations

Keep it brief (2-3 sentences per point).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Unable to generate summary at this time.';
  }
}

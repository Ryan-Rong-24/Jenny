import OpenAI from 'openai';

// Initialize OpenAI client
// Users need to set their API key in the environment or pass it here
export const initOpenAI = (apiKey: string) => {
  return new OpenAI({
    apiKey: apiKey,
  });
};

export interface GradeResult {
  score: number;
  feedback: string;
}

export async function gradeEmojiMatch(
  imageUri: string,
  targetEmoji: string,
  emojiName: string,
  apiKey: string
): Promise<GradeResult> {
  try {
    const openai = initOpenAI(apiKey);

    // Convert image to base64
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a fun and friendly judge for an emoji face-matching game! 
              
The user is trying to match the "${emojiName}" emoji (${targetEmoji}). 
Please analyze their facial expression and give them:
1. A score from 0-100 based on how well their expression matches the emoji
2. A brief, encouraging, and funny feedback comment (1-2 sentences max)

Be generous with scoring but honest! Make it fun and lighthearted.

Respond in this EXACT JSON format and nothing else (no prose, no code fences):
{
  "score": <number 0-100>,
  "feedback": "<your funny comment>"
}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
      response_format: { type: "json_object" },
    });

    const result = completion.choices[0].message.content?.trim();
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON robustly (handles plain JSON, fenced blocks, or prose-wrapped)
    let parsed: any;
    try {
      parsed = JSON.parse(result);
    } catch {
      const fenceMatch = result.match(/```json\s*([\s\S]*?)\s*```/i);
      if (fenceMatch) {
        parsed = JSON.parse(fenceMatch[1]);
      } else {
        const objectMatch = result.match(/\{[\s\S]*\}/);
        if (!objectMatch) {
          throw new Error('Could not parse response');
        }
        parsed = JSON.parse(objectMatch[0]);
      }
    }
    return {
      score: Math.min(100, Math.max(0, parsed.score)),
      feedback: parsed.feedback,
    };
  } catch (error) {
    console.error('Error grading emoji match:', error);
    throw error;
  }
}


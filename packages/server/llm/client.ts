import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
    model?: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
};

export const llmClient = {
    async generateText({ model = 'gpt-4o-mini', prompt, temperature = 0.2, maxTokens = 100 }: GenerateTextOptions): Promise<string> {
        const response = await client.responses.create({
            model,
            input: prompt,
            temperature,
            max_output_tokens: maxTokens,
        });
        return response.output_text;
    },
};

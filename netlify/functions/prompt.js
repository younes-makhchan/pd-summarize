// netlify/functions/claude.js

export async function handler(event, context) {
    const apiKey = process.env.key
    console.log(apiKey)
    ; // Set your API key in Netlify environment variables

    // Check if the request is a POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    // Parse the request body
    const { prompt } = JSON.parse(event.body);
    console.log(apiKey,prompt)

    try {
        const response = await fetch('https://api.anthropic.com/v1/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${apiKey}`,
                'anthropic-version':'2023-06-01',
                'max_tokens_to_sample':100000
            },
            body: JSON.stringify({model:"claude-2.1", prompt:"Human: please give me a summar of the following pdf text "+prompt+"\n\nAssistant:",'max_tokens_to_sample':100000 }),
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch from Claude API' }),
        };
    }
}

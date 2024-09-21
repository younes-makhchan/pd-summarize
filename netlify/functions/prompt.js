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
    const { prompt, max_tokens } = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.anthropic.com/v1/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ prompt, max_tokens }),
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

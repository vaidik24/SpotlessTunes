const { GoogleGenerativeAI } = require("@google/generative-ai");

const getMeaning = async ({lyrics, artist, song_name}) => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)

    const safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_NONE"
        }
    ]

    const model = genAI.getGenerativeModel({model: "gemini-pro", safetySettings: safety_settings});

    const prompt = `Explain the meaning of the song ${song_name} by ${artist}. Here are the lyrics for more context\n${lyrics}\n
    Dont reply with *. Keep the format clean`;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

}

module.exports = getMeaning;
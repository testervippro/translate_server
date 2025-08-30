const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;  // Use Render's provided port

const API_KEY = 'AIzaSyCI9ZV3RqLZ3_C5TcZsRb7X87U0yMc4zQ4';  // Replace with your Google Translate API Key

// Allow requests from any domain (e.g., GitHub Pages or other domains)
app.use(cors({
    origin: '*',  // This allows all domains to make requests to your server.
    methods: ['GET', 'POST'],  // Allow both GET and POST methods
    allowedHeaders: ['Content-Type'],  // Allow specific headers (you can add more if needed)
}));

app.use(express.json());

app.post('/translate', async (req, res) => {
    const { text, targetLang = 'vi' } = req.body;

    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
            q: text,
            target: targetLang
        });
        res.json({ translatedText: response.data.data.translations[0].translatedText });
    } catch (error) {
        console.error('Error in translation API:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

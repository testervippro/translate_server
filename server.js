const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;  // Use Render's provided port

const API_KEY = process.env.API_KEY; // Replace with your Google Translate API Key

// Allow requests from any domain (e.g., GitHub Pages or other domains)
app.use(cors({
    origin: '*',  // This allows all domains to make requests to your server.
    methods: ['GET', 'POST'],  // Allow both GET and POST methods
    allowedHeaders: ['Content-Type'],  // Allow specific headers
}));

// Add Content Security Policy (CSP) to allow connections to the specified API
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://translate-server-n0g5.onrender.com;");
    next();
});

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

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8080/ml';

// Optional: Mongoose connection (can be run without real Mongo for demo)
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('MONGO_URI not provided. Skipping DB connection.');
}

// Content Schema
const contentSchema = new mongoose.Schema({
    caption: String,
    hashtags: String,
    category: String,
    createdAt: { type: Date, default: Date.now },
    predictions: Object
});
let Content;
try {
    Content = mongoose.model('Content', contentSchema);
} catch (e) {
    console.warn("Mongoose model error ignored.");
}

// Endpoint to handle everything for the frontend
app.post('/api/content/predict', async (req, res) => {
    try {
        const { caption, hashtags, category } = req.body;
        
        let engagementRes, captionsRes, hashtagsRes, timeRes;

        try {
            // Attempt parallel requests to Java ML service
            [engagementRes, captionsRes, hashtagsRes, timeRes] = await Promise.all([
                fetch(`${ML_SERVICE_URL}/predict-engagement`, {
                    method: 'POST', body: JSON.stringify({ caption }), headers: { 'Content-Type': 'application/json' }
                }).then(r => r.json()),
                fetch(`${ML_SERVICE_URL}/suggest-captions`, {
                    method: 'POST', body: JSON.stringify({ caption }), headers: { 'Content-Type': 'application/json' }
                }).then(r => r.json()),
                fetch(`${ML_SERVICE_URL}/recommend-hashtags`, {
                    method: 'POST', body: JSON.stringify({ category }), headers: { 'Content-Type': 'application/json' }
                }).then(r => r.json()),
                fetch(`${ML_SERVICE_URL}/predict-time`, {
                    method: 'POST', body: JSON.stringify({ category }), headers: { 'Content-Type': 'application/json' }
                }).then(r => r.json())
            ]);
        } catch (mlError) {
            console.warn("Java ML service unreachable. Using backend JS fallback mocks.", mlError.message);
            // Fallback mocks
            engagementRes = { engagementScore: 40.0 + Math.min(60.0, (caption || "").length * 0.5), confidence: 0.85 };
            captionsRes = { suggestions: ["🔥 " + caption + " #MustWatch", caption + " - What do you think? 👇", "You won't believe this! " + caption] };
            hashtagsRes = { hashtags: ["#" + category, "#viral", "#trending", "#foryou", "#explore"] };
            timeRes = { bestPostingTime: "18:30", timezone: "UTC" };
        }

        const predictions = {
            engagement: engagementRes,
            captions: captionsRes.suggestions,
            hashtags: hashtagsRes.hashtags,
            time: timeRes
        };

        // Save to DB if connected
        if (mongoose.connection.readyState === 1 && Content) {
            const newContent = new Content({ caption, hashtags, category, predictions });
            await newContent.save();
        }

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 800));

        res.json({ success: true, original: { caption, hashtags, category }, predictions });
    } catch (error) {
        console.error('Error in predict:', error);
        res.status(500).json({ success: false, error: 'Failed to generate predictions' });
    }
});

app.get('/api/content/history', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1 && Content) {
             const history = await Content.find().sort({ createdAt: -1 }).limit(10);
             res.json(history);
        } else {
             res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

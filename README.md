# Predictive Viral Content Engine

## 1. System Architecture

The project consists of three main components across a full-stack architecture:

1. **Frontend (React)**: Handles the user interface, accepting input (caption, hashtags, category) and presenting real-time feedback, predictions (engagement score, posting time), and recommendations.
2. **Backend (Node.js/Express)**: Acts as the main application server and API Gateway. Handles user requests, interactions with MongoDB, and orchestrates calls to the ML service.
3. **ML Service (Java Spring Boot)**: Replaces Python. Handles AI and ML tasks including feature extraction (NLP), engagement prediction, and hashtag recommendations. We will utilize Java-based ML concepts (e.g., Tribuo or simple heuristic models for demonstration).
4. **Database (MongoDB)**: Stores user data, content history, and model analytics.

## 2. API Design

### Node.js Backend API
- `POST /api/content/predict`: Receives content payload, calls ML service, returns full response.
- `GET /api/content/history`: Fetches past content analyses from MongoDB.

### Java Spring Boot ML Service API
- `POST /ml/predict-engagement`: Predicts engagement score.
- `POST /ml/suggest-captions`: Returns NLP-optimized captions.
- `POST /ml/recommend-hashtags`: Returns trending hashtags.
- `POST /ml/predict-time`: Predicts optimal posting time.

## 3. Technology Stack specifics
- **Frontend**: React + Vite + Vanilla CSS (Aesthetic rich design)
- **Backend API**: Node.js + Express + Mongoose
- **ML Engine**: Java 17+, Spring Boot
- **Database**: MongoDB

## 4. Deployment Setup
- A `docker-compose.yml` file will orchestrate Frontend, Backend, ML Service, and MongoDB.
- Dockerfiles will be provided for all 3 services.

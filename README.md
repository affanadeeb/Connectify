# Connectify - Social Media Platform

## Overview
Connectify is a modern social media platform that allows users to connect, share thoughts, and interact with posts through reactions. The platform features real-time translation and text summarization capabilities powered by AI services.

## Features
* **User Authentication**
  - Sign up and login functionality
  - Secure session management
  - Protected routes

* **Post Management**
  - Create posts with text content
  - Upload images and videos
  - Delete your own posts
  - Express feelings/emotions with posts

* **Interactive Features**
  - React to posts with multiple emoji options
  - Real-time reaction counts
  - Translation of post content (powered by Google Translate API)
  - Text summarization (powered by Hugging Face API)

* **User Interface**
  - Modern, responsive design
  - Gradient-based theme
  - Intuitive navigation
  - Real-time updates

## Technology Stack
### Frontend
* React.js
* React Router for navigation
* Context API for state management
* CSS3 with modern features
* React Icons

### Backend
* Node.js
* Express.js
* MongoDB with Mongoose
* Session-based authentication
* Multer for file uploads

### AI Services
* Google Translate API (via RapidAPI)
* Hugging Face API for summarization

## Setup Instructions

### Prerequisites
* Node.js (v14 or higher)
* MongoDB
* npm or yarn
* RapidAPI key
* Hugging Face API key

### Environment Variables
Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
RAPIDAPI_KEY=your_rapidapi_key
HUGGING_FACE_API_KEY=your_huggingface_key
```

#### Frontend (.env.development)
```
REACT_APP_API_URL=http://localhost:5000
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/connectify.git
cd connectify
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Start the backend server
```bash
cd backend
npm start
```

5. Start the frontend development server
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
* `POST /api/auth/register` - Register new user
* `POST /api/auth/login` - User login
* `POST /api/auth/logout` - User logout

### Posts
* `GET /api/posts` - Get all posts
* `POST /api/posts` - Create new post
* `DELETE /api/posts/:id` - Delete a post
* `POST /api/posts/:id/translate` - Translate post content
* `POST /api/posts/:id/summarize` - Summarize post content
* `POST /api/posts/:id/react` - Add reaction to post

## Deployment
The application is configured for deployment on:
* Frontend: Vercel
* Backend: Render

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments
* Google Translate API for translation services
* Hugging Face for AI-powered text summarization
* React Icons for the icon library

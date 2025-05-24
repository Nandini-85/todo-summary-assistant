# Todo Summary Assistant

A full-stack application that allows users to create and manage to-do items, generate summaries of pending tasks using an LLM (OpenAI), and send these summaries to a Slack channel.

## Features

- Create, edit, and delete to-do items
- Mark to-dos as complete/incomplete
- Set deadlines for tasks
- Generate summaries of pending to-dos using OpenAI's GPT model
- Send summaries directly to a Slack channel
- Responsive UI for mobile and desktop

## Tech Stack

### Frontend
- **React**: For building the user interface
- **Axios**: For API requests
- **CSS**: Custom styling with responsive design

### Backend
- **Node.js**: Server-side JavaScript
- **Express**: Web framework for Node.js
- **Supabase**: PostgreSQL database for storing to-dos

### Integrations
- **OpenAI API**: For generating summaries using GPT
- **Slack Incoming Webhooks**: For sending summaries to Slack

## Project Structure

```
todo-summary-assistant/
├── frontend/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── services/              # API service files
│   │   ├── styles/                # CSS files
│   │   ├── App.jsx                # Main application component
│   │   └── index.jsx              # Entry point
│   ├── package.json
│   └── .env.example               # Example frontend environment variables
│
├── backend/                       # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/           # Route controllers
│   │   ├── models/                # Data models
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── config/                # Configuration files
│   │   ├── middleware/            # Express middleware
│   │   └── server.js              # Main server file
│   ├── package.json
│   └── .env.example               # Example backend environment variables
│
└── README.md                      # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm/yarn
- Supabase account
- OpenAI API key
- Slack workspace with admin access

### Database Setup

1. Create a new Supabase project
2. Create a `todos` table with the following schema:

```sql
CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  deadline DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd todo-summary-assistant/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Copy the `.env.example` file to `.env` and update with your credentials:
   ```
   cp .env.example .env
   ```
5. Update `.env` with your:
   - Supabase URL and API key
   - OpenAI API key
   - Slack webhook URL
6. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd todo-summary-assistant/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```
4. Update the API URL in `.env` if necessary
5. Start the frontend development server:
   ```
   npm start
   ```

## Setting Up Slack Integration

1. Go to your Slack workspace
2. Create a new app or use an existing one
3. Navigate to "Incoming Webhooks" feature
4. Create a new webhook for your channel
5. Copy the webhook URL and add it to your backend `.env` file as `SLACK_WEBHOOK_URL`

## Setting Up OpenAI Integration

1. Create or log in to your OpenAI account
2. Navigate to the API section and create a new API key
3. Copy the API key and add it to your backend `.env` file as `OPENAI_API_KEY`

## Design and Architecture Decisions

### Frontend Architecture

- **Component Structure**: Built with reusable, focused components (TodoForm, TodoList, TodoItem, etc.)
- **State Management**: Uses React's useState and useEffect hooks for managing component state
- **API Services**: Separate service modules for todo and summary operations
- **Notification System**: Temporary notifications for user feedback on actions
- **Responsive Design**: Mobile-first approach with flex layouts

### Backend Architecture

- **RESTful API**: Standard CRUD operations for todos
- **Separation of Concerns**:
  - **Controllers**: Handle HTTP requests and responses
  - **Models**: Define data structure and database operations
  - **Services**: Implement business logic for LLM and Slack integration
  - **Routes**: Define API endpoints
- **Error Handling**: Centralized error handling middleware

### Integration Decisions

- **OpenAI GPT**: Selected for high-quality natural language summarization
- **Slack Webhooks**: Simple, straightforward integration without requiring complex OAuth flows
- **Supabase**: Provides a PostgreSQL database with easy setup and good free tier options

## Deployment (Optional)

- **Frontend**: Deploy to Vercel, Netlify, or Firebase Hosting
- **Backend**: Deploy to Heroku, Render, or similar service
- **Database**: Use your existing Supabase project

## Future Enhancements

- Add user authentication
- Categories/tags for todos
- Rich text editing for descriptions
- Email notifications for approaching deadlines
- Statistics and productivity insights
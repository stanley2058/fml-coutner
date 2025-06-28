# FML Counter

A web app to track how bad you're feeling with a persistent counter stored in Redis.

## Features

- Username-based counter tracking
- Three increment buttons: +1, +5, +10
- Persistent storage using Redis
- Username saved in localStorage
- Responsive design with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start Redis server:
```bash
# Using Docker
docker run -d -p 6379:6379 redis:alpine

# Or install Redis locally and run
redis-server
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with:
```
REDIS_URL=redis://localhost:6379
```

## Usage

1. Enter your username in the input field
2. Click one of the three buttons based on how bad you're feeling:
   - +1 (Mildly annoyed)
   - +5 (Pretty frustrated) 
   - +10 (Life is terrible)
3. Your counter will be saved and persist across sessions

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Redis for persistence
- React hooks for state management

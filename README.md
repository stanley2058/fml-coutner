# FML Counter

A web app to track how bad you're feeling with a persistent counter stored in Redis.

## Features

- Username-based counter tracking
- Three increment buttons: +1, +5, +10
- Persistent storage using Redis
- Username saved in localStorage
- Responsive design with Tailwind CSS v4
- Docker support for easy deployment
- Production-ready with optimized builds

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone and start the entire stack
docker-compose up -d
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Local Development

1. Install dependencies:

```bash
npm install
```

2. Start Redis server:

```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install Redis locally and run
redis-server
```

3. Create environment file:

```bash
cp .env.local.example .env.local
# Edit REDIS_URL if needed (defaults to redis://localhost:6379)
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with:

```
REDIS_URL=redis://localhost:6379
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Usage

1. Enter your username in the input field
2. Click one of the three buttons based on how bad you're feeling:
   - +1 (Mildly annoyed)
   - +5 (Pretty frustrated)
   - +10 (Life is terrible)
3. Your counter will be saved and persist across sessions

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Redis 7 with persistence
- **Development**: Turbopack, ESLint, Prettier
- **Deployment**: Docker & Docker Compose

## Project Status

This project is a fully functional web application with:

- ✅ Complete frontend implementation
- ✅ Redis backend integration
- ✅ Docker containerization
- ✅ Production-ready configuration
- ✅ Code formatting and linting setup

## Development Attribution

This repository was built entirely using **Claude Sonnet 4** and **[sst/opencode](https://github.com/sst/opencode)**. The entire codebase, from initial concept to production-ready implementation, was generated through AI-assisted development without any manual coding intervention.

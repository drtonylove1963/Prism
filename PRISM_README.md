# Prism

A powerful visual theme editor for Tailwind CSS & shadcn/ui components with AI-powered theme generation.

## Overview

Prism is a modern web application that allows developers and designers to visually customize shadcn/ui component themes, preview changes in real-time, and export production-ready CSS variables. Built with Next.js 15 and featuring AI-powered theme generation through Google Gemini and Groq.

## Features

- **Visual Theme Editor**: Customize colors, typography, spacing, shadows, and border radius in real-time
- **AI-Powered Generation**: Generate themes from text descriptions or images
- **OKLCH Color Space**: Advanced color system for perceptually uniform color manipulation
- **Dark/Light Mode**: Full support for both color schemes with independent customization
- **Theme Presets**: Beautiful built-in presets to get started quickly
- **Undo/Redo**: 30-step history with intelligent 500ms debouncing
- **Live Preview**: See changes instantly across multiple component examples
- **Export Options**: Copy CSS variables, save themes, share with others
- **User Authentication**: Save and manage themes with Google/GitHub OAuth
- **Figma Integration**: Export themes for use in Figma

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand with IndexedDB persistence
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth (Google & GitHub OAuth)
- **AI**: Google Gemini & Groq APIs
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- Docker Desktop (for local PostgreSQL)
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prism.git
cd prism
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Random secret for auth encryption
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials
- `GOOGLE_API_KEY`: Google Gemini API key
- `GROQ_API_KEY`: Groq API key
- `GOOGLE_FONTS_API_KEY`: Google Fonts API key

### Local Development with Docker

4. Start PostgreSQL in Docker:
```bash
docker-compose up -d db
```

5. Apply database schema:
```bash
# Generate migrations
npx drizzle-kit generate

# Apply to database
docker exec -i tweakcn-db-1 psql -U postgres -d tweakcn < drizzle/0000_*.sql
docker exec -i tweakcn-db-1 psql -U postgres -d tweakcn < drizzle/0001_*.sql
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── actions/              # Next.js Server Actions
├── app/                  # App Router pages and layouts
│   ├── (auth)/          # Authentication routes
│   ├── ai/              # AI theme generation interface
│   ├── api/             # API routes
│   ├── dashboard/       # User dashboard
│   ├── editor/          # Main theme editor
│   └── settings/        # User settings
├── components/
│   ├── editor/          # Theme editor components
│   ├── examples/        # Preview components
│   └── ui/              # shadcn/ui base components
├── config/              # Configuration and defaults
├── db/                  # Database schema (Drizzle ORM)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and integrations
├── public/r/            # Theme registry (JSON)
├── scripts/             # Build scripts
├── store/               # Zustand state stores
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## Key Concepts

### Theme System

Themes use the **OKLCH color space** for perceptually uniform color manipulation. Each theme consists of:

- **Styles**: CSS variables for colors, fonts, spacing, shadows
- **Modes**: Independent light and dark color schemes
- **Presets**: Pre-configured theme templates

### State Management

- **Zustand stores** with IndexedDB persistence
- **Undo/redo history**: 30 steps with 500ms debouncing
- **Theme checkpoints**: Save and restore points

### AI Integration

- **Text-to-theme**: Describe your desired theme in natural language
- **Image-to-theme**: Upload an image to extract colors and generate a theme
- **Context-aware**: AI understands design terminology and color relationships

## Development Commands

```bash
# Development
npm run dev                          # Start dev server (Turbopack)

# Build
npm run generate-theme-registry      # Generate theme JSON files
npm run build                        # Production build

# Production
npm start                            # Start production server

# Code Quality
npm run lint                         # Run ESLint

# Database
npx drizzle-kit generate             # Generate migrations
npx drizzle-kit studio               # Open Drizzle Studio
npx drizzle-kit push                 # Push schema (Neon only)

# Docker
docker-compose up -d db              # Start PostgreSQL
docker-compose down                  # Stop all services
docker exec -it tweakcn-db-1 psql -U postgres -d tweakcn  # Access DB
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Auth encryption secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | For Google login |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | For Google login |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | For GitHub login |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | For GitHub login |
| `GOOGLE_API_KEY` | Google Gemini API key | For AI features |
| `GROQ_API_KEY` | Groq API key | For AI features |
| `GOOGLE_FONTS_API_KEY` | Google Fonts API key | For font loading |

## Database Schema

- **user**: User accounts and profiles
- **session**: Authentication sessions
- **account**: OAuth provider accounts
- **theme**: User-saved themes
- **ai_usage**: AI token usage tracking
- **subscription**: Premium subscriptions (Polar)
- **verification**: Email verification tokens

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat(editor): Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `docs(scope): description` - Documentation
- `style(scope): description` - Code style changes
- `refactor(scope): description` - Code refactoring
- `test(scope): description` - Tests
- `chore(scope): description` - Build/tooling

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built on top of [shadcn/ui](https://ui.shadcn.com/)
- Inspired by the need for better theme customization tools
- Powered by [Vercel](https://vercel.com) and [Neon](https://neon.tech)

## Links

- [Documentation](https://prism.example.com/docs)
- [Discord Community](https://discord.gg/prism)
- [Report Issues](https://github.com/yourusername/prism/issues)

---

Made with ❤️ by the Prism team
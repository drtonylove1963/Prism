# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**tweakcn** is a visual theme editor for Tailwind CSS & shadcn/ui components. It allows users to customize shadcn/ui themes visually, preview changes in real-time, and export CSS variables. The application features AI-powered theme generation, theme presets, and user authentication for saving themes.

## Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with Server Actions
- **TypeScript**
- **Tailwind CSS 4** for styling
- **shadcn/ui** components (Radix UI primitives)
- **Zustand** for client-side state management (with IndexedDB persistence)
- **Drizzle ORM** with Neon PostgreSQL database
- **Better Auth** for authentication (Google & GitHub OAuth)
- **Google Gemini** and **Groq** APIs for AI theme generation

## Common Commands

```bash
# Development
npm run dev                          # Start dev server with Turbopack at http://localhost:3000

# Build
npm run generate-theme-registry      # Generate theme registry JSON files (runs automatically on build)
npm run build                        # Build for production (includes theme registry generation)

# Production
npm start                            # Start production server

# Code Quality
npm run lint                         # Run ESLint

# Database
npx drizzle-kit push                 # Push database schema to Neon
npx drizzle-kit studio               # Open Drizzle Studio to view database
```

## Architecture

### State Management

The app uses **Zustand** stores with persistent storage via IndexedDB (`idb-keyval`):

- **`editor-store.ts`**: Core theme editor state with undo/redo history (max 30 entries, 500ms debounce). Manages `ThemeEditorState` including styles, presets, HSL adjustments, and theme checkpoints
- **`theme-preset-store.ts`**: Manages available theme presets (built-in and user-saved)
- **`ai-chat-store.ts`** & **`ai-theme-generation-store.ts`**: AI theme generation chat interface and state
- **`preferences-store.ts`**: User preferences (e.g., UI settings)
- **`auth-store.ts`**: Authentication state

### Theme System

Themes are represented as CSS variables using the **OKLCH color space**. The core type is `ThemeStyles`:

```typescript
ThemeStyles = {
  light: ThemeStyleProps,  // Light mode CSS variables
  dark: ThemeStyleProps    // Dark mode CSS variables
}
```

`ThemeStyleProps` includes colors (background, foreground, primary, secondary, etc.), fonts, border radius, shadows, spacing, and letter-spacing.

**Key files:**
- `config/theme.ts`: Default theme values and constants
- `types/theme.ts` & `types/editor.ts`: Type definitions
- `utils/theme-preset-helper.ts`: Functions for working with presets
- `store/editor-store.ts`: Theme state management with undo/redo

### Theme Registry

The `scripts/generate-theme-registry.ts` script generates JSON files for each preset theme in `public/r/themes/`. These files are used for theme sharing and imports. This script runs automatically during build.

### Database Schema

Located in `db/schema.ts` using Drizzle ORM:

- **user**: User accounts (id, name, email, image)
- **session** & **account**: Better Auth tables for sessions and OAuth
- **theme**: User-saved themes (id, userId, name, styles as JSON)
- **aiUsage**: Tracks AI token usage per user per day
- **subscription**: Polar subscription data

### Authentication

Uses **Better Auth** (`lib/auth.ts`) with Google and GitHub OAuth providers. Client-side auth is in `lib/auth-client.ts`.

### AI Integration

AI theme generation uses:
- **Google Gemini** (via `@ai-sdk/google`) for vision-based theme generation from images
- **Groq** for text-based theme generation

AI logic is in `lib/ai/ai-theme-generator.ts`. The API route is at `app/api/generate-theme/route.ts`.

### API Routes

- `app/api/generate-theme/route.ts`: AI theme generation endpoint
- `app/api/auth/[...all]/route.ts`: Better Auth endpoints
- `app/api/subscription/route.ts`: Subscription management
- `app/api/google-fonts/route.ts`: Google Fonts API proxy
- `app/api/webhook/polar/route.ts`: Polar webhook handler

## Project Structure Details

```
actions/              # Server Actions for themes, checkout, AI usage, customer data
app/
  (auth)/            # Auth-related routes (login/signup)
  (legal)/           # Privacy policy, terms
  ai/                # AI theme generation page with chat interface
  api/               # API routes (see above)
  dashboard/         # User dashboard showing saved themes
  editor/theme/      # Main theme editor (nested route: /editor/theme/[themeId])
  settings/          # User settings (usage stats, saved themes, billing)
  themes/[themeId]/  # Public theme preview page with OG image generation
components/
  editor/            # Theme editor UI components
    action-bar/      # Top toolbar (save, share, code export, AI, undo/redo)
    ai/              # AI chat interface components
    *.tsx            # Various editor panels (color picker, code panel, etc.)
  examples/          # Demo components for theme preview
  ui/                # Base shadcn/ui components
config/              # Default theme configuration
db/                  # Database schema and connection
hooks/               # Custom React hooks
lib/                 # Utilities and integrations (auth, AI, subscriptions)
  inspector/         # Theme inspector utilities for analyzing/modifying theme classes
public/r/            # Theme registry JSON files (generated)
scripts/             # Build-time scripts (theme registry generation)
store/               # Zustand state management
types/               # TypeScript type definitions
utils/               # Helper functions and utilities
```

## Development Notes

### Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `DATABASE_URL`: Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Auth encryption secret
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth
- `GOOGLE_API_KEY`: For Gemini AI
- `GROQ_API_KEY`: For Groq AI
- `GOOGLE_FONTS_API_KEY`: For font loading

After setup, run `npx drizzle-kit push` to initialize the database.

### Path Aliases

The project uses `@/*` path alias mapping to the root directory (`tsconfig.json`).

### Common Theme Styles

Styles that are shared between light and dark modes (defined in `config/theme.ts`):
- Font families (`font-sans`, `font-serif`, `font-mono`)
- Border radius (`radius`)
- Shadow properties (`shadow-*`)
- Letter spacing (`letter-spacing`)
- Spacing (`spacing`)

These use the light mode value for both modes.

### Troubleshooting

If you encounter issues after pulling changes:
1. Delete `node_modules` and `.next`
2. Run `npm install`
3. Run `npx drizzle-kit push` (if schema changed)
4. Run `npm run dev`

### Commit Convention

Use Conventional Commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(editor): Add contrast checker component`
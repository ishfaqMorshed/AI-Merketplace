# Overview

This is a full-stack AI business solutions platform built with React, Express.js, and TypeScript. The application showcases two main AI products: an intelligent business chatbot and an AI-powered recruiting system. It features a modern, responsive frontend with multi-language support, integrated live chat functionality, and demo booking capabilities. The platform is designed as a SaaS solution with product landing pages, interactive demos, and lead generation features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and bundling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **UI Components**: Radix UI primitives as the foundation for accessible, customizable components

## Backend Architecture
- **Server**: Express.js with TypeScript for the REST API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: In-memory storage with fallback interface for easy migration to persistent storage
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Internationalization
- **Multi-language Support**: Custom i18n implementation supporting English and Bengali
- **Context-based**: React Context API for language state management across components
- **Type-safe Translations**: TypeScript interfaces ensure translation consistency

## Development Tooling
- **Build System**: Vite with esbuild for fast builds and hot module replacement
- **Development Features**: Replit-specific plugins for error overlays and dev banners
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Clean import paths using TypeScript path mapping

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL serverless database (@neondatabase/serverless)
- **Connection**: Environment-based DATABASE_URL configuration

## AI Services
- **OpenAI**: GPT integration for chatbot functionality and conversation handling
- **API Key Management**: Environment variable configuration for secure API access

## UI and Styling Libraries
- **Radix UI**: Complete set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets (FontAwesome for social media icons)

## Development Dependencies
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for vendor prefixes

## Form and Validation
- **React Hook Form**: Efficient form state management
- **Zod**: TypeScript-first schema validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Additional Libraries
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional className utility for dynamic styling
- **cmdk**: Command palette component for enhanced UX
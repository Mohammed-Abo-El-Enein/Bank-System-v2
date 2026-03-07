# Bank System v2

A banking frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features
- Role-based authentication
- Admin dashboard
- Client portal
- Accounts and transactions views
- API integration with backend services

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Main Routes
- `/auth/login`
- `/dashboard`
- `/client`
- `/client/accounts`
- `/client/transfers`
- `/client/profile`
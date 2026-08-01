# Lost & Found Portal

A campus platform where students can report lost items, browse what's been found, and claim items — built as a college mini-project for Indira College of Engineering and Management (IndiraICEM).

**Team:** Akshay Chaudhari, Sujal Dhumal, Atharv Bhosale

## Features

- 🔍 **Browse lost items** — see everything reported across campus, with location and status at a glance (Open, Claim Pending, Returned)
- 📝 **Report a lost item** — post details about something you've lost
- 🙋 **Claim an item** — request to claim a found item, reviewed by the reporter before it's marked returned
- 🔐 **College-only signup** — accounts are restricted to `@indiraicem.ac.in` email addresses
- ✅ **Admin verification** — new accounts require admin approval before accessing the app

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/) — authentication and database
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) — styling and components
- [Framer Motion](https://www.framer.com/motion/) — animations

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Akshay-11-Og/lost-and-found-portal.git
cd lost-and-found-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

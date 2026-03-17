# CodeBox 2.0

CodeBox 2.0 is an interactive coding and learning platform designed to help users learn programming languages and web development interactively. Built with standard modern web technologies, it provides a seamless experience for taking courses, reading chapters, and completing hands-on coding exercises directly in the browser through a built-in code editor.

## 🚀 Features

- **Interactive Coding Environment**: Integrated with [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/) for realtime in-browser code execution.
- **Structured Courses**: Browse and enroll in various courses (HTML, CSS, Python, React, etc.), divided into manageable chapters and exercises.
- **User Authentication**: Secure user sign-up and login powered by [Clerk](https://clerk.com/).
- **Progress Tracking**: Track enrolled courses, completed exercises, and earn XP points.
- **Modern UI/UX**: Built with [Tailwind CSS v4](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/) components for a beautiful, responsive, and accessible user interface.
- **Database Architecture**: Fast and reliable serverless Postgres database using [Neon](https://neon.tech/) and [Drizzle ORM](https://orm.drizzle.team/).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Authentication**: Clerk
- **Interactive Sandbox**: Sandpack (by CodeSandbox)
- **Components/UI**: Radix UI, Shadcn-like components, Recharts for analytics

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+ recommended) and `npm` installed.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd codebox2.0
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables for Neon DB and Clerk Authentication:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=your_neon_postgres_database_url
```

### 4. Database Setup

Ensure your database schema is pushed to Neon using Drizzle:

```bash
npx drizzle-kit push
```

*(You can also use Drizzle Studio to view your data natively by running `npx drizzle-kit studio`)*

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

- `/app`: Next.js App Router providing application routes (`/(auth)`, `/(routes)`, `/api`, etc.)
- `/config`: Drizzle ORM configuration and database schemas (`schema.ts`)
- `/public`: Static assets, images, SVG icons, and banners.
- `/components`: Reusable UI components.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is proprietary or licensed under your chosen license. (Update this section accordingly)

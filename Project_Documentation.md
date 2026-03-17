# Codebox 2.0 - Project Documentation

## 1. Project Overview

### What is this project all about?
Codebox 2.0 is a modern, interactive, and gamified e-learning platform and code sandbox environment. It allows users to browse programming courses, enroll in them, and directly practice coding in an in-browser editor. The platform tracks user progress (XP/points), records completed exercises, and features a rich dashboard for users to visualize their learning journey.

### How is this project helpful to the user?
It bridges the gap between theoretical learning and practical coding. Instead of watching a video and opening a local IDE, users are provided with chapter-wise instructions and a built-in interactive code editor (sandbox) side-by-side. This layout offers immediate feedback, reducing the friction of setting up a local development environment.

### Why should one use your project?
- **Zero Setup Time**: The in-browser IDE allows users to start writing HTML, CSS, JS, or React instantly.
- **Progress Tracking**: XP and leveling systems gamify the learning experience, encouraging users to stay consistent.
- **All-in-One Experience**: High-quality UI, theoretical chapters, and practical exercises are seamlessly integrated into a single hub.

---

## 2. Tech Stack & Libraries Used (and Why)

###  Frontend Framework: Next.js (v16.1.0) with React (v19)
- **Why**: Next.js provides the App Router for clean directory-based routing, excellent SEO, and the ability to hybridize Server Components (for fast loads and secure DB calls) loops with Client Components (for interactivity).
- **Why it's better**: It handles routing natively out of the box and is fundamentally significantly faster than raw React (CRA/Vite) for complex applications because it pushes heavy rendering to the server.

### Styling & UI: Tailwind CSS v4 + Shadcn UI (Radix UI)
- **Why**: Tailwind allows for ultra-fast styling using utility classes without constantly switching between CSS and JS files. Shadcn UI leverages Radix UI's "headless" accessible primitives (Dropdowns, Dialogs, Selects) and wraps them in beautiful Tailwind styles.
- **Why it's better**: Writing accessible, complex components (like Accordions or Modals) from scratch is error-prone. Shadcn gives you full control of the code without the bloat of traditional component libraries like Material UI or Bootstrap.

### Authentication & User Management: Clerk (`@clerk/nextjs`)
- **Why**: Clerk handles the entire authentication flow (Sign Up, Sign In, OAuth providers like Google, Password Recovery) and session management. 
- **Why it's better**: Compared to a custom JWT implementation or NextAuth/Auth.js, Clerk gives you pre-built aesthetic UI components and a dedicated user management dashboard, saving weeks of backend engineering and security patching.

### Database & ORM: PostgreSQL (Neon Serverless) + Drizzle ORM
- **Why**: We are running a relational PostgreSQL database hosted on Neon. To interface with the DB, we use Drizzle ORM to write type-safe queries in TypeScript.
- **Why it's better**: Drizzle is highly performant and doesn't rely on a heavy Rust engine like Prisma, making it "edge-compatible" and significantly faster to start up in a serverless Next.js environment. Neon Serverless scales automatically down to zero when not in use, making it incredibly cost-effective.

### Core Feature - Code Editor: Sandpack (`@codesandbox/sandpack-react`)
- **Why**: This library powers the interactive code sandbox side of the exercises.
- **Why it's better**: Building a code execution engine from scratch involves complex Docker containers, WebSockets, and massive security risks. Sandpack delegates the execution securely to the browser via Web Workers and iframes, utilizing CodeSandbox's proven infrastructure.

### Form Handling & Validation: React Hook Form + Zod
- **Why**: Used for taking user input securely and validating it.
- **Why it's better**: React Hook Form minimizes re-renders on every keystroke (unlike standard React state forms), and Zod guarantees that the data reaching the server exactly matches the expected schema.

### Data Fetching: Axios
- **Why**: Used in Client Components to make API requests easily.
- **Why it's better**: It automatically transforms JSON data, provides easy interception for headers/errors, and is generally more readable than the native `fetch` API.

---

## 3. Application Routes & APIs

### Frontend Routes (`app/(routes)`)
- `/dashboard` : The logged-in user's personalized center showing enrolled courses, user stats, and XP.
- `/courses` : The catalog of all available courses.
- `/courses/[courseId]` : The specific details for a course, listing all chapters and the user's progress.
- `/courses/[courseId]/[chapterId]` : The active learning view featuring the Sandbox code editor and instructions.

### API Routes (`app/api/`)
- `/api/user` (POST): Called upon login to check if the Clerk authenticated user exists in the Postgres DB. If not, it creates a synchronized user record with 0 initial points.
- `/api/course` (GET): 
  - Without parameters: Fetches all available courses for the catalog.
  - With `?courseid=`: Returns a deeply joined/aggregated object containing the course details, its chapters, the exact logged-in user's enrollment status, and their completed exercises.
- `/api/enroll-course`: Handles the logic of adding a `user` to a `course` within the DB.
- `/api/exercise`: Handles interactions related to checking and marking code exercises as complete.
- `/api/admin`: Administrative endpoints used for publishing courses or modifying chapter content.

### Data Fetching Mechanism
- **Server-Side Security**: In the API Routes (e.g., `api/user`), we utilize Clerk's `currentUser()` on the server to securely identify who is sending the request, preventing users from forging requests for another account.
- **Client-Side Fetching**: Pages like the `/courses/[courseId]` use React's `useEffect` + `Axios` to hit the internal API endpoints asynchronously and populate local state (`useState`).
    
---

## 4. Key Questions an Interviewer Might Ask (Interview Prep)

**Q: Why did you choose Drizzle ORM over Prisma?**
**A:** Next.js heavily relies on Serverless and Edge functions. Prisma uses a compiled Rust query engine which is quite large and can cause cold-start delays or hit size limits on serverless platforms (like Vercel). Drizzle is just pure TypeScript mapping to SQL. It is significantly faster, lightweight, and lets you write queries that look much closer to actual SQL.

**Q: How do you handle security for running the user's code? Could they write a malicious script?**
**A:** We use the Sandpack library by CodeSandbox. Sandpack does not execute user code on our backend servers. It securely bundles and runs the code strictly on the client side (the user's browser) within an isolated iframe and Web Workers. This prevents malicious server-side execution risks.

**Q: I see you are using Clerk for Auth. How is the user data linked to your own database?**
**A:** Clerk handles the actual authentication layer and JWT tokens. However, we also need local relationship tables (like courses a user has taken). To solve this, in our `/api/user` route, whenever a user connects, we check if their email from Clerk exists in our Drizzle `usersTable`. If they don't exist yet, we insert their Clerk ID/Email into our own database to maintain a local, trackable profile (mapping their points and courses).

**Q: How do you ensure your API routes are secure and can't be hit by unauthenticated users?**
**A:** Every protected API route leverages Clerk's `currentUser()` or Next.js middleware. Before performing any database operations mapped via Drizzle, we check if `user` exists. If the request doesn't have a valid session token cookie, `currentUser()` returns null, and we reject the request.

**Q: Why did you use Tailwind CSS and Radix UI (Shadcn) instead of standard CSS or Material UI?**
**A:** Traditional CSS leads to massive, hard-to-maintain stylesheets (`globals.css`). Tailwind resolves this via utility classes that stay tightly coupled to the component. We used Shadcn UI (which uses Radix) because it provides fully accessible, unstyled functionality (keyboard navigation, ARIA tags). We get the best of both worlds: enterprise-grade accessibility logic with absolute freedom over Tailwind styling—without the heavy bundle size of Material UI.

**Q: Does your dashboard use Server-Side Rendering (SSR) or Client-Side Rendering (CSR)?**
**A:** It uses a hybrid approach. The root layouts and headers can rely heavily on Server Components, but highly interactive pieces (like the Sandpack editor, sliders, or the `useEffect` hooks fetching user-specific dynamic dashboard data) are marked with `'use client'` to utilize CSR. This effectively balances initial load speeds with vast client interactivity.

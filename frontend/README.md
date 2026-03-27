# CCOG University Portal

A full-featured university admission portal built with React, TypeScript, and Tailwind CSS. It allows students to apply for courses online, upload documents, track their admission status, and receive offer letters — all in one place. Admins can manage applications, students, payments, and documents through a dedicated panel.

---

## Tech Stack

- **React 18** with TypeScript
- **Vite** (dev server + build tool)
- **React Router v6** (client-side routing)
- **Tailwind CSS** + shadcn/ui (UI components)
- **TanStack React Query** (data fetching)
- **React Hook Form** + Zod (form validation)
- **Recharts** (charts)
- **Lucide React** + React Icons (icons)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project folder
cd university-portal-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:8080`

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests once |

---

## Project Structure

```
src/
├── components/         # Shared components (Navbar, Footer, etc.)
│   └── ui/             # shadcn/ui base components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/
│   ├── Index.tsx       # Landing page
│   ├── AboutPage.tsx   # About page
│   ├── CoursesPage.tsx # Courses listing
│   ├── LoginPage.tsx   # Login
│   ├── RegisterPage.tsx# Registration
│   ├── student/        # Student dashboard pages
│   └── admin/          # Admin panel pages
└── App.tsx             # Root component with routing
```

---

## Pages & Routes

### Public Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/about` | About CCOG |
| `/courses` | Browse courses |
| `/login` | Login |
| `/register` | Register |

### Student Dashboard (`/dashboard`)

| Route | Page |
|---|---|
| `/dashboard` | Overview |
| `/dashboard/application` | Application status |
| `/dashboard/documents` | Upload documents |
| `/dashboard/payments` | Payment history |
| `/dashboard/offer` | Offer letter |
| `/dashboard/classes` | Online classes |
| `/dashboard/settings` | Settings |

### Admin Panel (`/admin`)

| Route | Page |
|---|---|
| `/admin` | Overview & KPIs |
| `/admin/applications` | Manage applications |
| `/admin/students` | Student list |
| `/admin/courses` | Course management |
| `/admin/payments` | Payment records |
| `/admin/documents` | Document verification |
| `/admin/offers` | Offer letters |
| `/admin/settings` | Admin settings |

---

## Features

- **Student Portal** — Apply for courses, upload documents, track application progress, view offer letters, join online classes
- **Admin Panel** — Review and approve applications, verify documents, manage students, courses, and payments
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Demo Mode** — No login required to explore both portals

---

## Notes

- This is a frontend-only project (no backend/API). All data is static/mock.
- The app uses `BrowserRouter` for routing. Always run via `npm run dev` for local development — do not open HTML files directly in the browser.

# tarkon-teacher-platform

The **Teacher Platform** is the command center for educators on Tarkon. Teachers manage classrooms, create assignments, review AI-generated insights, and collaborate with students and parents.

---

## Features

- Classroom & student roster management
- Assignment creation with AI-assisted rubric generation
- Real-time submission tracking and grading
- Student weakness detection dashboards (via `tarkon-weakness-detection-engine`)
- Knowledge graph overlays per student
- Live session hosting (whiteboard, audio, screen sharing)
- Parent communication hub
- Exportable progress reports (PDF, CSV)

---

## Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Framework   | Next.js 14 (App Router)                  |
| Language    | TypeScript                               |
| Styling     | Tailwind CSS + tarkon-design-system      |
| State       | Zustand + React Query                    |
| Real-time   | WebSocket (tarkon-realtime-platform)     |
| Auth        | JWT + RBAC (tarkon-identity-access-management) |
| Charts      | Recharts                                 |
| Testing     | Vitest + Playwright                      |

---

## Project Structure

```
src/
  app/
    (auth)/
    dashboard/
    classrooms/
    assignments/
    students/[id]/
    sessions/
    reports/
  components/
  hooks/
  lib/
  store/
  types/
tests/
docs/
```

---

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev       # http://localhost:3001
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_REALTIME_URL=ws://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8001
PORT=3001
```

---

## License

MIT

# Nike Clone

A fullstack Nike-inspired ecommerce website built as a portfolio/learning project.

## Tech Stack

### Frontend
- **TanStack Start** — fullstack React framework with file-based routing
- **React 19** — UI library
- **TanStack Router** — type-safe file-based routing
- **TanStack Query (React Query)** — data fetching, caching, and state management
- **TailwindCSS 4** — utility-first CSS styling
- **TypeScript** — type safety
- **Vite** — build tool and dev server

### Backend
- **Django REST Framework** — REST API
- **PostgreSQL** — database
- **Django Admin** — product management panel

### Infrastructure
- **Docker** — PostgreSQL database container
- **pnpm** — frontend package manager

## Prerequisites

Make sure you have these installed:

- **Node.js** (v18+)
- **pnpm** — `npm install -g pnpm`
- **Python 3** (3.10+)
- **Docker** — [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd nike-clone
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers psycopg2-binary
```

### 3. Install frontend dependencies

```bash
cd frontend
pnpm install
```

### 4. Start everything

From the project root:

```bash
bash bin/dev.sh
```

This will:
- Start the PostgreSQL database via Docker
- Start the Django backend on `http://127.0.0.1:8000`
- Start the frontend dev server on `http://localhost:3000`

### 5. Run migrations (first time only)

```bash
bash bin/migrate.sh
```

### 6. Create an admin user (first time only)

```bash
bash bin/createsuperuser.sh
```

Then go to `http://127.0.0.1:8000/admin/` to add products.

## Scripts

| Script | What it does |
|--------|-------------|
| `bash bin/dev.sh` | Starts database, backend, and frontend |
| `bash bin/migrate.sh` | Runs Django makemigrations + migrate |
| `bash bin/createsuperuser.sh` | Creates a Django admin superuser |

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/products/` | List all products |
| GET | `/api/products/?category=men` | Filter by category (men/women/kids) |
| GET | `/api/products/?type=shoes` | Filter by type (shoes/clothing/accessories) |
| GET | `/api/products/?subcategory=running` | Filter by subcategory |
| GET | `/api/products/?featured=true` | Featured products only |
| GET | `/api/products/<id>/` | Single product detail |

Filters can be combined: `/api/products/?category=men&type=shoes&subcategory=running`

## Project Structure

```
nike-clone/
├── backend/                # Django REST API
│   ├── core/               # Django project settings
│   └── products/           # Products app (models, views, serializers)
├── frontend/               # TanStack Start frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── lib/            # API functions and utilities
│       ├── routes/         # File-based routes
│       └── integrations/   # TanStack Query setup
├── bin/                    # Shell scripts
└── docker-compose.yml      # PostgreSQL container
```

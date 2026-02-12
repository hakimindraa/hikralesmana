# Photography Portfolio Website

Full-stack portfolio website dengan Next.js (Frontend) dan Laravel (Backend) + Admin Panel.

## Features

### Frontend (Next.js)
- ✨ Minimalist design dengan thin fonts
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Tailwind CSS styling
- 🖼️ Gallery dengan masonry layout
- 📊 Stats dengan counter animations
- 💬 Testimonials carousel
- 📧 Contact form
- 🎯 Smooth scrolling & animations

### Backend (Laravel)
- 🔐 Admin authentication
- 📝 CRUD API untuk Projects, Skills, Testimonials
- 💾 MySQL database
- 🔒 Protected admin routes
- 📬 Contact form handler

### Admin Panel
- 🎛️ Dashboard untuk manage content
- 📁 Projects management
- ⚡ Skills management
- 💬 Testimonials management
- 🔐 Secure login system

## Setup Instructions

### Backend Setup

1. Navigate ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy .env.example ke .env:
```bash
copy .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database di .env:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio_db
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations:
```bash
php artisan migrate
```

7. Seed admin user:
```bash
php artisan db:seed --class=AdminSeeder
```

8. Start Laravel server:
```bash
php artisan serve
```

Backend akan berjalan di: http://localhost:8000

### Frontend Setup

1. Navigate ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env.local file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend akan berjalan di: http://localhost:3000

## Admin Access

### Login Credentials
- Email: `admin@visual.com`
- Password: `admin123`

### Admin URLs
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin/dashboard
- Projects: http://localhost:3000/admin/projects
- Skills: http://localhost:3000/admin/skills
- Testimonials: http://localhost:3000/admin/testimonials

## API Endpoints

### Public Endpoints
- GET `/api/projects` - Get all projects
- GET `/api/projects/{id}` - Get single project
- GET `/api/skills` - Get all skills
- GET `/api/testimonials` - Get all testimonials
- POST `/api/contact` - Submit contact form

### Admin Endpoints (Protected)
- POST `/api/admin/login` - Admin login
- POST `/api/admin/logout` - Admin logout
- GET `/api/admin/me` - Get current admin user

#### Projects
- GET `/api/admin/projects` - List all projects
- POST `/api/admin/projects` - Create project
- PUT `/api/admin/projects/{id}` - Update project
- DELETE `/api/admin/projects/{id}` - Delete project

#### Skills
- GET `/api/admin/skills` - List all skills
- POST `/api/admin/skills` - Create skill
- PUT `/api/admin/skills/{id}` - Update skill
- DELETE `/api/admin/skills/{id}` - Delete skill

#### Testimonials
- GET `/api/admin/testimonials` - List all testimonials
- POST `/api/admin/testimonials` - Create testimonial
- PUT `/api/admin/testimonials/{id}` - Update testimonial
- DELETE `/api/admin/testimonials/{id}` - Delete testimonial

## Database Schema

### projects
- id, title, description, image, category, client, date, timestamps

### skills
- id, name, category, level, timestamps

### testimonials
- id, name, position, company, message, image, rating, timestamps

### contacts
- id, name, email, message, timestamps

### users
- id, name, email, password, remember_token, timestamps

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- React Hooks

### Backend
- Laravel 10
- MySQL
- RESTful API

## Development

### Run Both Servers
Gunakan batch files yang tersedia:

```bash
# Setup backend
setup-backend.bat

# Setup frontend
setup-frontend.bat

# Run development servers
run-dev.bat
```

## Struktur Folder

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/          # Admin panel pages
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── projects/
│   │   │   │   ├── skills/
│   │   │   │   └── testimonials/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx        # Main portfolio page
│   │   └── components/         # Reusable components
│   └── public/
└── backend/
    ├── app/
    │   ├── Http/Controllers/
    │   │   ├── Admin/          # Admin controllers
    │   │   └── ...             # Public controllers
    │   └── Models/
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    └── routes/
        └── api.php
```

## License

MIT License

## Contact

For questions or support, contact: admin@visual.com

# Portfolio — Jose Benjumea

Portfolio personal full-stack: frontend en React + backend en Django REST Framework.

- **Sitio:** [josebenjumea.site](https://josebenjumea.site)
- **Autor:** Jose Benjumea (`imJOS3`)

## Estructura

```
portfolio/
├── frontend/     # React + Vite + TypeScript + Tailwind
└── backend/      # Django + DRF (API REST)
```

## Requisitos

- Node.js 18+ y npm
- Python 3.11+
- (Opcional) PostgreSQL en producción (Render)

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

### Scripts

| Comando        | Descripción              |
|----------------|--------------------------|
| `npm run dev`  | Servidor de desarrollo   |
| `npm run build`| Build de producción      |
| `npm run preview` | Previsualizar el build |

### Variables de entorno (`frontend/.env`)

```env
VITE_URL_BASE_BACKEND=http://127.0.0.1:8000
```

## Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API en [http://127.0.0.1:8000](http://127.0.0.1:8000)  
Admin en [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### Endpoints principales

| Recurso        | Ruta                         |
|----------------|------------------------------|
| FAQs           | `GET /api/faqs/`             |
| Favoritos      | `GET /api/favorites/`        |
| Contacto       | `POST /api/contact-messages/`|
| Certificados   | `GET /api/certificates/`     |
| Proyectos      | `GET /api/projects/`         |

### Variables de entorno (producción / Render)

| Variable | Descripción |
|----------|-------------|
| `SECRET_KEY` | Clave secreta de Django |
| `DEBUG` | `True` / `False` |
| `RENDER` | Si existe, usa PostgreSQL |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` | Credenciales PostgreSQL |
| `CREATE_SUPERUSER` | `True` para crear admin al desplegar |
| `DJANGO_SUPERUSER_USERNAME` | Usuario admin |
| `DJANGO_SUPERUSER_EMAIL` | Email admin |
| `DJANGO_SUPERUSER_PASSWORD` | Password admin |

Hay un `render.yaml` en `backend/` para despliegue en Render.

## Secciones del portfolio

- Home, Projects, About, Skills, Certificates, Contact
- FAQs, formulario de contacto y “Mis hobbies” (favoritos) consumen la API

## Primer push a GitHub

1. Crea un repositorio vacío en GitHub.
2. En la raíz del proyecto:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

## Licencia

Proyecto personal — uso libre para referencia / portfolio.

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-u75l5(s&-7*s1e$c#q-3fpv5_faj$%$(@gqq0!!gv+&d^6o8l%')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = [
    os.environ.get('RENDER_EXTERNAL_HOSTNAME', ''),
    'localhost',
    '127.0.0.1'
]

# -----------------------------
# 🔹 Apps
# -----------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # externas
    'rest_framework',
    'corsheaders',
    # internas
    'content',
]

# -----------------------------
# 🔹 Middleware
# -----------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # debe estar al inicio
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",  # WhiteNoise para archivos estáticos
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

# -----------------------------
# 🔹 Templates (igual)
# -----------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# -----------------------------
# 🔹 Database (sqlite por ahora)
# -----------------------------
# Base de datos: usa PostgreSQL en Render, SQLite local
if os.environ.get('RENDER'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME'),
            'USER': os.environ.get('DB_USER'),
            'PASSWORD': os.environ.get('DB_PASSWORD'),
            'HOST': os.environ.get('DB_HOST'),
            'PORT': os.environ.get('DB_PORT', '5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# -----------------------------
# 🔹 Password validators (igual)
# -----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# -----------------------------
# 🔹 Internacionalización
# -----------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# -----------------------------
# 🔹 Archivos estáticos y media
# -----------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]  # Agregar esta línea
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Configuración adicional de WhiteNoise
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = True
WHITENOISE_INDEX_FILE = True

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------
# 🔹 Configuración CORS
# -----------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://josebenjumea.site",
]

# -----------------------------
# 🔹 Configuración DRF (opcional)
# -----------------------------
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# -----------------------------
# 🔹 Crear superusuario automáticamente (solo en Render)
# -----------------------------
import django
from django.contrib.auth import get_user_model

try:
    django.setup()
    User = get_user_model()

    if os.environ.get('CREATE_SUPERUSER', 'False') == 'True':
        username = os.environ['DJANGO_SUPERUSER_USERNAME']
        email = os.environ['DJANGO_SUPERUSER_EMAIL']
        password = os.environ['DJANGO_SUPERUSER_PASSWORD']

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            print(f"✅ Superusuario '{username}' creado automáticamente.")
except Exception as e:
    print(f"⚠️ No se pudo crear el superusuario automáticamente: {e}")

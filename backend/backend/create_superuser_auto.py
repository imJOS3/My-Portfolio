import os
import django
import sys
from django.contrib.auth import get_user_model

# Aseguramos que Python encuentre la ruta correcta del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
sys.path.append(PROJECT_ROOT)
sys.path.append(BASE_DIR)

# Configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()

username = "admin"
email = "admin@example.com"
password = "admin123"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"✅ Superusuario creado correctamente: {username}")
else:
    print(f"⚠️ El superusuario '{username}' ya existe.")

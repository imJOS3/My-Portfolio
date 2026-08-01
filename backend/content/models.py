from django.db import models
from django.utils.text import slugify

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question



# Nuevo modelo para favoritos
class FavoriteItem(models.Model):
    TYPE_CHOICES = [
        ("serie", "Serie"),
        ("anime", "Anime"),
        ("juego", "Juego"),
    ]
    titulo = models.CharField(max_length=200)
    tipo = models.CharField(max_length=10, choices=TYPE_CHOICES)
    imagen = models.URLField(max_length=500)
    resumen = models.CharField(max_length=300)
    descripcion = models.TextField()
    palabras_clave = models.CharField(max_length=200)
    año_lanzamiento = models.IntegerField()
    link_externo = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.titulo} ({self.tipo})"


# Modelo para mensajes de contacto
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

# Modelo para certificados
class Certificate(models.Model):
    TIPO_CHOICES = [
        ('curso', 'Curso'),
        ('diploma', 'Diploma'),
        ('taller', 'Taller'),
        ('otro', 'Otro'),
    ]

    ESTADO_CHOICES = [
        ('completado', 'Completado'),
        ('en_progreso', 'En progreso'),
        ('pendiente', 'Pendiente'),
    ]

    titulo = models.CharField("Título", max_length=200)
    tipo = models.CharField("Tipo", max_length=20, choices=TIPO_CHOICES, default='curso')
    estado = models.CharField("Estado", max_length=20, choices=ESTADO_CHOICES, default='completado')
    institucion = models.CharField("Institución", max_length=200, default="")
    anio = models.PositiveIntegerField("Año")
    descripcion = models.TextField("Descripción (qué aprendiste)", blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Certificado"
        verbose_name_plural = "Certificados"
        ordering = ['-anio', '-creado']

    def __str__(self):
        return f"{self.titulo} ({self.anio})"

# Modelo para proyectos
class Project(models.Model):
    title = models.CharField(max_length=150)    
    description = models.TextField()
    technologies = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    project_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
 
from django.contrib import admin
from .models import FAQ, FavoriteItem, ContactMessage, Certificate, Project
from .models import ContactMessage

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "published")
    list_editable = ("order", "published")


# Registrar FavoriteItem en el admin
@admin.register(FavoriteItem)
class FavoriteItemAdmin(admin.ModelAdmin):
    list_display = ("titulo", "tipo", "año_lanzamiento")
    search_fields = ("titulo", "tipo", "palabras_clave")


# Registrar ContactMessage en el admin
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    search_fields = ("name", "email", "subject")


# Registrar Certificate en el admin
@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("titulo", "tipo", "institucion", "estado", "anio", "creado")
    list_filter = ("tipo", "estado", "anio", "institucion")
    search_fields = ("titulo", "descripcion", "institucion")
    readonly_fields = ("creado", "actualizado")

# Registrar Project en el admin
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'technologies', 'project_url', 'created_at')
    search_fields = ('title', 'technologies')
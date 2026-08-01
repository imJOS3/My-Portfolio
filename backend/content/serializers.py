from rest_framework import serializers
from .models import FAQ, FavoriteItem, ContactMessage, Certificate, Project

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"


# Serializer para proyectos
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# Serializer para FavoriteItem
class FavoriteItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteItem
        fields = "__all__"


# Serializer para ContactMessage
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [
            'id',
            'titulo',
            'tipo',
            'institucion',   
            'estado',
            'anio',
            'descripcion',
            'creado',
            'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']

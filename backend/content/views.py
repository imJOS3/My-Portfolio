from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import FAQ, FavoriteItem, ContactMessage, Certificate, Project
from .serializers import (
    FAQSerializer, FavoriteItemSerializer,
    ContactMessageSerializer, CertificateSerializer,
    ProjectSerializer
)

# -----------------------------
# ViewSets uniformados
# -----------------------------

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all().order_by("order")
    serializer_class = FAQSerializer


class FavoriteItemViewSet(viewsets.ModelViewSet):
    queryset = FavoriteItem.objects.all()
    serializer_class = FavoriteItemSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['titulo', 'descripcion', 'tipo']
    ordering_fields = ['anio', 'creado']
    ordering = ['-anio', '-creado']


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

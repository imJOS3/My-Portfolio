from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    FAQViewSet, FavoriteItemViewSet, ContactMessageViewSet,
    CertificateViewSet, ProjectViewSet
)

router = DefaultRouter()
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'favorites', FavoriteItemViewSet, basename='favorite')
router.register(r'contact-messages', ContactMessageViewSet, basename='contact')
router.register(r'certificates', CertificateViewSet, basename='certificate')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path("", include(router.urls)),
]

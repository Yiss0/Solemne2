from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import TareaViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'tareas', TareaViewSet, basename='tarea')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

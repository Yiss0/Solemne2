from rest_framework import routers
from .api import TareaViewSet

router = routers.DefaultRouter()

router.register('api/tareas', TareaViewSet, 'tareas')

urlpatterns = router.urls
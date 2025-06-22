from .models import Tarea
from rest_framework import viewsets, permissions
from .serializers import TareaSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = TareaSerializer
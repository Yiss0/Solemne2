from .models import Tarea
from rest_framework import viewsets, permissions, generics
from .serializers import TareaSerializer, UsuarioSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UsuarioSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all() 
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TareaSerializer
    def get_queryset(self):
        return self.request.user.tareas.all()

    def perform_create(self, serializer):
        serializer.save(propietario = self.request.user)
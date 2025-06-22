from rest_framework import serializers
from .models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ('id_tarea', 'titulo', 'descripcion', 'completado', 'fechaCreada', 'fechaVenci', 'prioridad')
        read_only_fields = ('fechaCreada',)
from rest_framework import serializers
from .models import Tarea
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(write_only = True, required = True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['username'] = validated_data.get('email')
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)

class TareaSerializer(serializers.ModelSerializer):
    usuario = serializers.EmailField(source='usuario.email', read_only = True)
    class Meta:
        model = Tarea
        fields = ('id_tarea','usuario', 'titulo', 'descripcion', 'completado', 'fechaCreada', 'fechaVenci', 'prioridad')
        read_only_fields = ('fechaCreada', 'usuario')
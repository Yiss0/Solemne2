from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

prioridades = (
    ('0', 'Alta'),
    ('1', 'Media'),
    ('2', 'Baja')
)


class Tarea(models.Model):
    id_tarea = models.AutoField(primary_key = True)
    usuario = models.ForeignKey(User, related_name='tareas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length = 200)
    descripcion = models.TextField(blank = True)
    completado = models.BooleanField(default = False)
    fechaCreada = models.DateField(auto_now_add = True)
    fechaVenci = models.DateField()
    prioridad = models.CharField(max_length = 1, choices = prioridades)
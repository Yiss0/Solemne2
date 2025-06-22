from django.db import models

# Create your models here.

prioridades = (
    ('0', 'Alta'),
    ('1', 'Media'),
    ('2', 'Baja')
)


class Tarea(models.Model):
    id_tarea = models.AutoField(primary_key = True)
    titulo = models.CharField(max_length = 200)
    descripcion = models.TextField()
    completado = models.BooleanField(default = False)
    fechaCreada = models.DateField(auto_now_add = True)
    fechaVenci = models.DateField()
    prioridad = models.CharField(max_length = 1, choices = prioridades)
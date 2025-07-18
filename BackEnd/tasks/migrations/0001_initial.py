# Generated by Django 5.2.3 on 2025-06-22 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id_tarea', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('completado', models.BooleanField(default=False)),
                ('fechaCreada', models.DateField(auto_now_add=True)),
                ('fechaVenci', models.DateField()),
                ('prioridad', models.CharField(choices=[('0', 'Alta'), ('1', 'Media'), ('2', 'Baja')], max_length=1)),
            ],
        ),
    ]

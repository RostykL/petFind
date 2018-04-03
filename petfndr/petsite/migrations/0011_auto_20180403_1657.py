# Generated by Django 2.0.1 on 2018-04-03 16:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('petsite', '0010_pet_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]

# Generated by Django 2.0.1 on 2018-03-29 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('petsite', '0008_pet_fame'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='author',
        ),
    ]

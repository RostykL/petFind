# Generated by Django 2.0.1 on 2018-04-05 15:57
# Generated by Django 2.0.1 on 2018-04-06 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('petsite', '0011_auto_20180403_1657'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='postedBy',
            field=models.CharField(default='Anonymouse', max_length=100),
        ),
    ]
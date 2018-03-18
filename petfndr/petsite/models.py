from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=100, default='')
    petName = models.CharField(max_length=100, default='')
    phone = models.IntegerField(default=0)

    def __str__(self):
    	return self.petName
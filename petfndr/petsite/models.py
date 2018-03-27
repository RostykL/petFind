from django.db import models
# from django.contrib.auth.models import User

# Create your models here.
class Author(models.Model): 
	first_name = models.CharField(max_length=30, default="")
	last_name = models.CharField(max_length=50, default="")
	phone = models.IntegerField(default=0)
	email = models.EmailField()

class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, default="")
    description = models.CharField(max_length=100, default='')
    petName = models.CharField(max_length=100, default='')

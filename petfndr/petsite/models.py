from django.db import models
# from django.contrib.auth.models import User

# Create your models here.
class Author(models.Model): 
    first_name = models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=50, default="")
    phone = models.IntegerField(default=0)
    email = models.EmailField()

    def __str__(self):
        return self.last_name

class Pet(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, default="")
    description = models.CharField(max_length=100, default='')
    pet_name = models.CharField(max_length=100, default='')
    last_seen_place = models.CharField(max_length=100, default='Somewhere above the sky')
    prize_for_help = models.IntegerField(default=0)
    image = models.CharField(max_length=200, default="""
        http://papapodari.com.ua
        /sites/default/files
        /node/product/vinny_pux_4.jpg
        """)  #Image field works bad

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.pet_name

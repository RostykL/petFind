from django.db import models
from django.contrib.auth.models import User

class Pet(models.Model):
    postedBy = models.CharField(max_length=100, default="Anonymouse")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    description = models.CharField(max_length=100, default='')
    pet_name = models.CharField(max_length=100, default='')
    last_seen_place = models.CharField(max_length=100, default='Somewhere above the sky')
    fame = models.IntegerField(default=0)
    prize_for_help = models.IntegerField(default=0)
    image = models.CharField(max_length=200, default="http://papapodari.com.ua/sites/default/files/node/product/vinny_pux_4.jpg")  #Image field works bad
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.pet_name

from rest_framework import serializers
from .models import Pet
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        extra_kwargs = {"author" : {"required": False}}
        model = Pet
        fields = (
            'id',
            'postedBy',  
            'author', 
            'description',
            'pet_name',
        )

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = (
            'postedBy',
            'last_seen_place',
            'prize_for_help',
            'image',
            'pet_name',
            'author',
            'description'
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email'
        )

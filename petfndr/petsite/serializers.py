from rest_framework import serializers
from .models import Pet

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        extra_kwargs = {"author" : {"required": False}}
        model = Pet
        fields = (
            'id',
            'author',   
            'description',
            'pet_name',
        )

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = (
            'last_seen_place',
            'prize_for_help',
            'image',
            'pet_name',
        )


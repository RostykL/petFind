from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		extra_kwargs = {
			'phone': {'write_only': True}
		}
		fields = (
			'id',
			'user',
			'description',
			'petName',
			'phone'
		)
from rest_framework import generics
from . import models
from . import serializers

# REGISTRATION IMPORTS
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from petsite.forms import SignUpForm

# API 
class PetCreateList(generics.ListCreateAPIView):
	queryset = models.Post.objects.all()
	serializer_class = serializers.PostSerializer

class RetrieveUpdateDestroyPost(generics.RetrieveUpdateDestroyAPIView):
	queryset = models.Post.objects.all()
	serializer_class = serializers.PostSerializer    


# REGISTRATION

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'petsite/signup.html', {'form': form})
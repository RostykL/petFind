from django.shortcuts import render
from rest_framework import generics
from . import models
from . import serializers

# REGISTRATION IMPORTS
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from petsite.forms import SignUpForm
from django.contrib.auth.mixins import LoginRequiredMixin
# API 
class PetCreateList(LoginRequiredMixin, generics.ListCreateAPIView):
    login_url = '/login/'
    redirect_field_name = 'redirect_to'
    queryset = models.Pet.objects.all()
    serializer_class = serializers.PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RetrieveUpdateDestroyPost(generics.RetrieveUpdateDestroyAPIView):
	queryset = models.Pet.objects.all()
	serializer_class = serializers.PostSerializer    

class PetList(generics.ListAPIView):
    serializer_class = serializers.PetSerializer

    def get_queryset(self):
        queryset = models.Pet.objects.all()
        filterparam = self.request.query_params.get('last_seen_place', None)
        #filterparam = self.request.query_params.get('pet_name', None)
        if filterparam is not None:
            queryset = queryset.filter(last_seen_place__icontains=filterparam).order_by('fame')
        return queryset

class UserInfo(generics.ListAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        filterparam = self.request.query_params.get('id', None)
        #filterparam = self.request.query_params.get('pet_name', None)
        if filterparam is not None:
            queryset = queryset.filter(id=filterparam)
        else:
            queryset = None
        return queryset


def index(request):
    return render(request, 'index.html', {})


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

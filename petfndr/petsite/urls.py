from django.urls import path, include

from . import views

from petsite import views as core_views

app_name="petsite"

urlpatterns = [
    path('', views.PetCreateList.as_view(), name='pet_list'),
    path('post/<int:pk>', views.RetrieveUpdateDestroyPost.as_view(), name='post_detail'),    
    path('signup/', core_views.signup, name='signup'),
]

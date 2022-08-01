import json
from django.contrib.auth import authenticate, login, logout
from click import password_option
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from .models import User
from django.core import serializers
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
    return render(request, "layout.html")

#create new user
def register(request):
    post_data = json.loads(request.body)
    get_username = post_data.get('username')
    get_password = post_data.get('password')
    new_user = User.objects.create(username=get_username, password=get_password, age=10)
    login(request, new_user)
    
    return HttpResponseRedirect(reverse('index'))

def login_user(request):
    post_data = json.loads(request.body)
    get_username = post_data.get('username')
    get_password = post_data.get('password')
    
    current_user = User.objects.get(username=get_username)
    if current_user.password == get_password:
        print("Logged in!")
    else:
        print("NOT logged in!")
        
    auth_user = authenticate(username=get_username, password=get_password)
    if auth_user is not None:
        login(current_user)
        print("Auth login: Logged in!")
    else:
        print("Auth login: NOT logged in!")
        
    return HttpResponseRedirect(reverse('index'))
        
#login existing user
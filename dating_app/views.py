import json
import random
from django.contrib.auth import authenticate, login, logout
from click import password_option
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from .models import User
from django.core import serializers
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

@ensure_csrf_cookie
def index(request):
    #User.objects.all().delete()
    return render(request, "layout.html")

#create new user
@csrf_exempt
def register(request):
    post_data = json.loads(request.body)
    get_username = post_data.get('username')
    get_email = post_data.get('email')
    get_password = post_data.get('password')
    new_user = User.objects.create(username=get_username, password=get_password, email=get_email)
    login(request, new_user)
    
    return JsonResponse({'user_id': new_user.id})

@csrf_exempt
def login_user(request):
    post_data = json.loads(request.body)
    get_username = post_data.get('username')
    get_password = post_data.get('password')
    
    current_user = User.objects.get(username=get_username)
    if current_user.password == get_password:
        print("Logged in!")
        print(current_user.id)
        return JsonResponse({'user_id': current_user.id})
    else:
        print("NOT logged in!")
        #set up warning message
        
    auth_user = authenticate(username=get_username, password=get_password)
    if auth_user is not None:
        login(current_user)
        print("Auth login: Logged in!")
    else:
        print("Auth login: NOT logged in!")
        
    return HttpResponseRedirect(reverse('index'))
        
#login existing user


def get_user(request, id):
    get_user = User.objects.get(id=id)

    return JsonResponse([get_user.serialize_personal_info(), get_user.serialize_other_facts()], safe=False)


def get_cookie(request):
    token = get_token(request)
    return JsonResponse({'cookie': token})


def get_random_user(request, id):
    num_of_users = User.objects.all().count()
    random_num = random.randrange(1, num_of_users)
    
    if random_num != id:
        random_user = User.objects.get(id=random_num)
        return JsonResponse([random_user.serialize_personal_info(), random_user.serialize_other_facts()], safe=False)
    
    return get_random_user(request, id)

def create_combo(request, id):
    post_data = json.loads(request.body)
    get_question_1 = post_data.get('question1')
    get_question_2 = post_data.get('question2')
    get_question_3 = post_data.get('question3')
   # get_answer_1 = 
    pass
    

def show_all_users(request):
    all_users = User.objects.all()
    
    return JsonResponse([user.serialize_personal_info() for user in all_users], safe=False)
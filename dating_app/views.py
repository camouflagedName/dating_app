import io
import json
import random
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from .models import Combo_Instance, User, Combo_Template, Combo_Question, Combo_Question_Answer, Message
from django.core import serializers
from django.core.files.images import ImageFile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
from rest_framework.decorators import api_view, parser_classes



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
    logout(request)
    post_data = json.loads(request.body)
    get_username = post_data.get('username')
    get_password = post_data.get('password')
    
    current_user = User.objects.get(username=get_username)

    if current_user.password == get_password:
        login(request, current_user)
        return JsonResponse({'user_id': current_user.id})
    else:
        print("NOT logged in!")
        #set up warning message
        
    auth_user = authenticate(username=get_username, password=get_password)
    print(auth_user)
    if auth_user is not None:
        login(current_user)
        print("Auth login: Logged in!")
    else:
        print("Auth login: NOT logged in!")
        
    return HttpResponseRedirect(reverse('index'))
        
#login existing user


def get_user(request, id):    
    get_user = User.objects.get(id=id)

    return JsonResponse([get_user.serialize_private_data(), get_user.serialize_tier1_data(), get_user.serialize_tier2_data()], safe=False)

def get_selected_user_data(request, username, level):
    this_user = User.objects.get(id=request.user.id)
    get_user = User.objects.get(username=username)
    
    if level == 0:
        return JsonResponse([get_user.serialize_combo_data_public()], safe=False)
    if level == 1:
        return JsonResponse([get_user.serialize_combo_data_public(), get_user.serialize_tier1_data()], safe=False)
    else:
        return JsonResponse([get_user.serialize_combo_data_public(), get_user.serialize_tier1_data(), get_user.serialize_tier2_data()], safe=False)


def get_cookie(request):
    token = get_token(request)
    return JsonResponse({'cookie': token})


def get_random_user(request, id):

    num_of_users = User.objects.all().count()
    random_num = random.randrange(1, num_of_users+1)

    if random_num != id:
        random_user = User.objects.get(id=random_num)
        
        if random_user.profile_complete:
            try:
                picture = random_user.picture.url
            except:
                picture = None
        
            return JsonResponse({
                "username": random_user.username,
                "picture": picture
                })
    
    return get_random_user(request, id)

@csrf_exempt
def create_combo(request, id):
    #Combo_Template.objects.all().delete()
    creator = User.objects.get(id=id)
    new_combo = Combo_Template.objects.create(creator=creator)
    post_data = json.loads(request.body)
    
    for entry in post_data:
        correct_answer_name = post_data[entry]["correct_answer"].replace(f'{entry}-', "")
        
        new_combo_question = Combo_Question.objects.create(template=new_combo, name=entry, content=post_data[entry]["content"])
        for answer_num in post_data[entry]["answerData"]:
            Combo_Question_Answer.objects.create(name=answer_num, content=post_data[entry]['answerData'][answer_num], question=new_combo_question)


        get_correct_answer = Combo_Question_Answer.objects.get(name=correct_answer_name, question=new_combo_question)
        get_correct_answer.is_correct = True
        get_correct_answer.save()
    
    return JsonResponse({'status': 'ok'})

def get_user_facts(request, username):
    user = User.objects.get(username=username)
    
    return JsonResponse([user.serialize_user_facts()], safe=False)
 
def get_user_info(request, username):
    user = User.objects.get(username=username)
    
    return JsonResponse([user.serialize_public_info()], safe=False)

def show_all_users(request):
    all_users = User.objects.all()
    
    return JsonResponse([user.serialize_personal_info() for user in all_users], safe=False)


def create_default_combo(request):
    pass

def show_all_combos(request):
    all_combos = Combo_Template.objects.all()
    
    return JsonResponse([combo.serialize() for combo in all_combos], safe=False)

@csrf_exempt
def update_user(request, id):
    print(request.user.id)
    print(id)
    if request.user.id == id:
        
        get_user = User.objects.get(id=id)
        get_data = json.loads(request.body)
        data_obj = {"age": '', "location": '', "gender": '', "about": ''}

        for entry in get_data:
            data_obj[entry.lower()] = get_data[entry]
        
        get_user.age = data_obj['age']
        get_user.location = data_obj['location']
        get_user.gender = data_obj['gender']
        get_user.about = data_obj['about']
        get_user.save()
        
        if get_user.age and get_user.location and get_user.gender and get_user.about and get_user.picture:
            get_user.profile_complete = True
        print(get_user.profile_complete)
        get_user.save()
        
        return JsonResponse([get_user.serialize_personal_info()], safe=False)
    
    return JsonResponse({"Status": "Failure to get data.", "Reason": "ID does not match."})


def solve_combo(request, user_id, combo_id):
    #Combo_Template.objects.all().delete()
    solver = User.objects.get(id=user_id)
    combo_template = Combo_Template.objects.get(id=combo_id)
    correct_ans_count = 0 
    
    #new_combo = Combo_Template.objects.create(creator=creator)
    post_data = json.loads(request.body)
    
    for entry in post_data:
        chosen_answer_name = post_data[entry]["correct_answer"].replace(f'{entry}-', "")
        combo_question = Combo_Question.objects.get(name=entry, template=combo_template)       

        #query for an answer using the solver's chosen answers
        get_answer = Combo_Question_Answer.objects.get(name=chosen_answer_name, question=combo_question)
        
        #if the solver's chosen answer is true, they got it correct
        if get_answer.is_correct:
            correct_ans_count += 1
            
    num_wrong = 5 - correct_ans_count
    
    Combo_Instance.objects.create(viewer=solver, template=combo_template, num_correct=correct_ans_count, num_wrong=num_wrong)
    
    if correct_ans_count >= 4:
        creator = User.objects.get(username=combo_template.creator)
        solver.match.set(creator)
    
    return JsonResponse({'num_correct': correct_ans_count})


def get_completed_combos(request, user_id):
    user = User.objects.get(id=user_id)
    
    return JsonResponse([combo_instance_data.serialize() for combo_instance_data in user.combos_accessed.all()], safe=False)

@csrf_exempt
def send_message(request, receiver_name, sender_id):
    try:
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(username=receiver_name)
        message_data = json.loads(request.body)
        subject = message_data.get("subject")
        content = message_data.get("content")
        Message.objects.create(sender=sender, receiver=receiver, subject=subject, content=content)
       
    except:
        return JsonResponse({"response": "Message could not be delivered."})
    
    else:
        return JsonResponse({"response": "success"})
    
def get_messages(request, user_id):
    user = User.objects.get(id=user_id)
    
    return JsonResponse([user.serialize_messages()], safe=False)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request, user_id):
    user = User.objects.get(id=user_id)
    data = request.data
    file_name = data.get('name')
    
    image = data.get('image')
    image_file = ImageFile(image, name=file_name)
    
    user.picture = image_file
    
    if user.age and user.location and user.gender and user.about and user.picture:
        user.profile_complete = True
    user.save()

 

    #bytes = io.BytesIO(request.body)

    #image = ImageFile(bytes, name=title)

    #user.picture = image
    #user.save()
    
    return JsonResponse({"message": "hello"})



def get_image_path(request, username):
    user = User.objects.get(username = username)
    
    try:
        picture_URL = user.picture.url
    except:
        picture_URL = None
    
    return JsonResponse({"img_path": picture_URL})
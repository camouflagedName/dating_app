from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    MALE = 'M'
    FEMALE = 'F'
    TRANSGENDER = 'T'
    NONBINARY_NONCONFORMING = 'N'
    OTHER = "O"
    GENDER_CHOICES = [(MALE, 'Male'), (FEMALE, 'Female'), (TRANSGENDER, 'Transgender'), (NONBINARY_NONCONFORMING, 'Non-binary/Non-conforming'), (OTHER, 'Prefer not to respond')]
    
    match = models.ManyToManyField("User", related_name="matched_with")
    like = models.ManyToManyField("User", related_name="liked_by")
    interests = models.TextField(blank=True)
    about = models.TextField(blank=True)
    gender = models.CharField(blank=False, choices=GENDER_CHOICES, max_length=100)
    age = models.IntegerField(blank=True, null=True)
    location = models.TextField(blank=False)
    current = models.BooleanField(default=True)
    #user_combos_completed = models.ManyToManyField("User", related_name="combo_attempted_by")
    picture = models.ImageField(upload_to='profile_pics', default='')
    profile_complete = models.BooleanField(default=False)
    
    def serialize_personal_info(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "age": self.age,
            "location": self.location,
            "about": self.about,
            "interests": self.interests,
            "gender": self.gender,
        }
        
    def serialize_public_info(self):
        return {
            "username": self.username,
            "email": self.email,
            "age": self.age,
            "location": self.location,
            "about": self.about,
            "interests": self.interests,
            "gender": self.gender,
        }
        
    def serialize_combo_data_public(self):
        return {
            "combo_data": [combo.serialize_public() for combo in self.user_combo.all()] 
        }
        
    def serialize_tier1_data(self):

        return {
            "matched_user_id": [user.id for user in self.match.all()],
            "liked_user_id": [user.id for user in self.like.all()],
            "num_attempted_combos": self.combos_accessed.all().count(),
        }
        
    #possibly delete
    def serialize_other_facts(self):
        return {
            "matched_user_id": [user.id for user in self.match.all()],
            "liked_user_id": [user.id for user in self.like.all()],
            "combo_data": [combo.serialize() for combo in self.user_combo.all()]  
        }
        
    def serialize_user_facts(self):

        return {
            "num_matches": self.match.all().count(),
            "num_likes": self.like.all().count(),
            "num_attempted_combos": self.combos_accessed.all().count(),
        }
        
    def serialize_tier2_data(self):
        return {
            "username": self.username,
            "age": self.age,
            "location": self.location,
            "about": self.about,
            "interests": self.interests,
        }
        
    def serialize_private_data(self):
        return {
            "id": self.id,
            "email": self.email,
            "complete": self.profile_complete,  
            "combo_data": [combo.serialize() for combo in self.user_combo.all()],

        }
    
    def serialize_messages(self):
        return {
            "sent_messages": [message.serialize() for message in self.sent_messages.all()],
            "received_messages": [message.serialize() for message in self.received_messages.all()]
        }

class Message(models.Model):
    sender = models.ForeignKey("User", on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey("User", on_delete=models.CASCADE, related_name="received_messages")
    timestamp = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=64, default="(no subject)")
    content = models.TextField(blank=False)

    def serialize(self):
        return {
            "message_id": self.id,
            "sender": self.sender.username,
            "receiver": self.receiver.username,
            "subject": self.subject,
            "content": self.content,
            "timestamp_day_month": self.timestamp.strftime("%b %d"),
            "timestamp_num": self.timestamp.strftime("%x"),
            "timestamp_time": self.timestamp.strftime("%I:%M %p")
        }
    
class Combo_Template(models.Model):
    creator = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_combo")
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def serialize(self):
        return {
            "combo_id": self.id,
            "timestamp": self.timestamp.strftime("%x"),
            "creator": self.creator.username,
            "questions_by_id": [question.id for question in self.combo_question.all()],
            "data": [question.serialize() for question in self.combo_question.all()]
        }
        
    def serialize_public(self):
        return {
            "combo_id": self.id,
            "creator": self.creator.username,
            "data": [question.serialize_public() for question in self.combo_question.all()]
        }
        
    def serialize_min(self):
        return {
            "combo_id": self.id,
            "creator": self.creator.username,
        }
    
class Combo_Instance(models.Model):
    viewer = models.ForeignKey("User", on_delete=models.PROTECT, related_name="combos_accessed")
    template = models.ForeignKey("Combo_Template", on_delete=models.CASCADE, related_name="instance")
    num_correct = models.IntegerField()
    num_wrong = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def serialize(self):
        return {
            "instance_id": self.id,
            "num_correct": self.num_correct,
            "date_solved": self.timestamp.strftime("%x"),
            "combo_data": self.template.serialize_min(),
        }
    
class Combo_Question(models.Model):
    name = models.CharField(max_length=64)
    content = models.TextField()
    template = models.ForeignKey("Combo_Template", on_delete=models.CASCADE, related_name="combo_question")
    
    def serialize(self):
        return {
            "name": self.name,
            "content": self.content,
            "answers": [answer.serialize() for answer in self.answer_choice.all()]
        }
        
    def serialize_public(self):
        return {
            "name": self.name,
            "content": self.content,
            "answers": [answer.serialize_public() for answer in self.answer_choice.all()]
        }
    
class Combo_Question_Answer(models.Model):
    name = models.CharField(max_length=64)
    content = models.TextField()
    question = models.ForeignKey("Combo_Question", on_delete=models.CASCADE, related_name="answer_choice")
    is_correct = models.BooleanField(default=False)
    
    def serialize(self):
        return {
            "name": self.name,
            "content": self.content,
            "is_correct": self.is_correct
        }
        
    def serialize_public(self):
        return {
            "name": self.name,
            "content": self.content,
        }
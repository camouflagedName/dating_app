from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    match = models.ManyToManyField("User")
    like = models.ManyToManyField("User", related_name="liked_by")
    interests = models.TextField(blank=True)
    about = models.TextField(blank=True)
    gender = models.Choices
    age = models.IntegerField()
    location = models.TextField()
    current = models.BooleanField(default=True)
    #puzzle
    #picture
    
    def serialize(self):
        pass

class Message(models.Model):
    sender = models.ForeignKey("User", on_delete=models.CASCADE, related_name="sent_message")
    receiver = models.ForeignKey("User", on_delete=models.CASCADE, related_name="received_message")
    timestamep = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=64, default="(no subject)")
    content = models.TextField(blank=False)

    def serialize(self):
        pass
    
class Puzzle(models.Model):
    pass
    #creator
    #number correct
    #number wrong
    #completed
    #difficulty
    #puzzle question ==> many to many
    
class PuzzleQuestion(models.Model):
    #correct answer
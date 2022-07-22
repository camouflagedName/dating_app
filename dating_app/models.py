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
    age = models.IntegerField(blank=False)
    location = models.TextField(blank=False)
    current = models.BooleanField(default=True)
    puzzles_solved = models.ManyToManyField("Puzzle_Instance", related_name="solver")
    picture = models.ImageField(upload_to='picture_uploads/', default='')
    
    def serialize(self):
        pass

class Message(models.Model):
    sender = models.ForeignKey("User", on_delete=models.CASCADE, related_name="sent_message")
    receiver = models.ForeignKey("User", on_delete=models.CASCADE, related_name="received_message")
    timestamp = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=64, default="(no subject)")
    content = models.TextField(blank=False)

    def serialize(self):
        pass
    
class Puzzle_Template(models.Model):
    creator = models.ForeignKey("User", on_delete=models.CASCADE, related_name="created_puzzle")
    difficulty = models.IntegerField()
    questions = models.ManyToManyField("Puzzle_Question", blank=False)
    
class Puzzle_Instance(models.Model):
    viewer = models.ForeignKey("User", on_delete=models.CASCADE, related_name="puzzles_accessed")
    num_correct = models.IntegerField()
    num_wrong = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Puzzle_Question(models.Model):
    content = models.TextField()
    is_correct = models.BooleanField()
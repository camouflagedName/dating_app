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
    puzzles_solved = models.ManyToManyField("Combo_Instance", related_name="solver")
    picture = models.ImageField(upload_to='picture_uploads/', default='')
    profile_complete = models.BooleanField(default=False)
    
    def serialize_personal_info(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "age": self.age,
            "location": self.location,
            "interests": self.interests,
        }
        
    def serialize_other_facts(self):
        return {
            "matched_user_id": [user.id for user in self.match.all()],
            "liked_user_id": [user.id for user in self.like.all()],
        }

class Message(models.Model):
    sender = models.ForeignKey("User", on_delete=models.CASCADE, related_name="sent_message")
    receiver = models.ForeignKey("User", on_delete=models.CASCADE, related_name="received_message")
    timestamp = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=64, default="(no subject)")
    content = models.TextField(blank=False)

    def serialize(self):
        pass
    
class Combo_Template(models.Model):
    creator = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_puzzle")
    difficulty = models.IntegerField()
    questions = models.ManyToManyField("Combo_Question", blank=False)
    
class Combo_Instance(models.Model):
    viewer = models.ForeignKey("User", on_delete=models.PROTECT, related_name="combo_accessed")
    template = models.ForeignKey("Combo_Template", on_delete=models.CASCADE, related_name="instance")
    num_correct = models.IntegerField()
    num_wrong = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Combo_Question(models.Model):
    content = models.TextField()
    is_correct = models.BooleanField()
    template = models.ForeignKey("Combo_Template", on_delete=models.CASCADE, related_name="combo_question")
    right_answer = models.ForeignKey("Combo_Question_Answer", on_delete=models.PROTECT, related_name="parent_question")
    
class Combo_Question_Answer(models.Model):
    content = models.TextField()
    question = models.ForeignKey("Combo_Question", on_delete=models.CASCADE, related_name="wrong_answer")
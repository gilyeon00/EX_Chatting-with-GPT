from django.db import models

class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

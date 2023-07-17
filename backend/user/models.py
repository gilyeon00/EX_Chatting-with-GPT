from django.db import models
from django.contrib.auth.hashers import make_password

class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    @classmethod
    def create_user(cls, username, password):
        hashed_password = make_password(password)
        user = cls(username=username, password=hashed_password)  # Use cls to create new instance
        user.save()
        return user


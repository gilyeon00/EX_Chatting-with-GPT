from django.db import models
from user.models import Users


class Rooms(models.Model):
    room_id = models.AutoField(primary_key=True)
    user_id1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='rooms1')
    user_id2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='rooms2')


class Chats(models.Model):
    chat_id = models.AutoField(primary_key=True)
    room_id = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    content = models.TextField()

    def save_chat_message(self, room_id, content):
        self.room_id = room_id
        self.content = content
        self.save()

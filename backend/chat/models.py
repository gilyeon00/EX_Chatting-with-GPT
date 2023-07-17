from django.db import models
# import django 
# django.setup() 

# from user.models import Users
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async

class Rooms(models.Model):
    room_id = models.AutoField(primary_key=True)
    # user_id1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='rooms1')
    # user_id2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='rooms2')


class Chats(models.Model):
    chat_id = models.AutoField(primary_key=True)
    # user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    room_id = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    content = models.TextField()

    async def save_chat_message(self, room_id, content):
        # user = await sync_to_async(get_object_or_404)(Users, user_id=user_id)
        room = await sync_to_async(get_object_or_404)(Rooms, room_id=room_id)  
        # self.user_id = user
        self.room_id = room
        self.content = content
        await sync_to_async(self.save)()


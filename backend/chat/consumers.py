import json
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import Rooms, Chats
from asgiref.sync import database_sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_id

        if not await self.room_exists(self.room_id):
            print("Error: Room does not exist")
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.save_chat_message(self.room_id, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def room_exists(self, room_id):
        return Rooms.objects.filter(room_id=room_id).exists()

    @database_sync_to_async
    def save_chat_message(self, room_id, message):
        chat = Chats(room_id=Rooms.objects.get(room_id=room_id), content=message)
        chat.save()

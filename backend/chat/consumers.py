from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Chats  # Chats 모델 import

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_name

        # 채팅방 그룹에 참가
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # 채팅방 그룹을 떠남
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # WebSocket에서 메세지를 받음
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Get userId from session
        # user_id = self.scope['session']['userId']

        # 메세지를 채팅방 그룹에 전송
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        
        # 채팅 메세지 저장
        chat = Chats()
        await chat.save_chat_message(self.room_name, message)


    # 채팅방 그룹에서 메세지를 받음
    async def chat_message(self, event):
        message = event['message']

        # 메세지를 WebSocket에 전송
        await self.send(text_data=json.dumps({
            'message': message
        }))
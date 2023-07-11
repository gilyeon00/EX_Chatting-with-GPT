from django.urls import path
from .views import CheckChatroomView

urlpatterns = [
    path('check-chatroom', CheckChatroomView.as_view(), name='check_chatroom'),
]
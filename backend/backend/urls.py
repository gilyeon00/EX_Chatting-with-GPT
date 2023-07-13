import os
import openai
from django.contrib import admin
from django.urls import path, include
from django.http import StreamingHttpResponse, HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('chat/', include('chat.urls')),
]



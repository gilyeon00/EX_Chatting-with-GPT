import os
from django.contrib import admin
from django.urls import path, include
from django.http import StreamingHttpResponse, HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/chat/', include('chat.urls')),
]



from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from chat.models import Rooms
import json

class CheckChatroomView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(CheckChatroomView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            room_id = data.get('room_id')

            if not room_id:
                return JsonResponse({'error': 'Invalid request'}, status=400)

            room = Rooms.objects.filter(room_id=room_id).first()

            if not room:
                return JsonResponse({'error': 'Room does not exist'}, status=404)


            return JsonResponse({'success': 'User connected to the room'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

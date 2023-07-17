from user.models import Users
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import IntegrityError
from django.http import JsonResponse


@csrf_exempt
def check_username(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            user = Users.objects.get(username=username)
            response_data = {
                'userId' : user.user_id,
                'username': username,
                'exists': True
            }
        except Users.DoesNotExist:
            print(username)
            response_data = {
                'userId': None,
                'username': username,
                'exists': False
            }

        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@csrf_exempt
def join(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Please provide both username and password'}, status=400)

        try:
            user = Users.create_user(username, password=password)
            return JsonResponse({'success': 'User created successfully'}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'Username is already taken'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

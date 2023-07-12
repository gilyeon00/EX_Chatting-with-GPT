from user.models import Users
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
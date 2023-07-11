from user.models import Users
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def check_username(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')  # 클라이언트로부터 받은 'aaa'와 같은 문자열
        user_exists = Users.objects.filter(username = username).exists()

        response_data = {
            'username': username,
            'exists': user_exists
        }
        
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Invalid request method'})

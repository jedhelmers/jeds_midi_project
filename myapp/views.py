from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.views.generic import TemplateView
import uuid
import json

from .models import SequenceMatrix


@csrf_exempt
def save_sequence(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print('data', data)
            user_id = data['user_id']
            print('user_id', user_id)
            sequence_matrix = data['sequence_matrix']
            print('sequence_matrix', sequence_matrix)

            # Creating a new Sequence instance and saving it
            sequence = SequenceMatrix(user_id=user_id, sequence_matrix=sequence_matrix)
            print('id', sequence.id)
            print('date_created', sequence.date_created)
            sequence.save()

            return JsonResponse({'message': 'Sequence saved successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is supported'}, status=405)


class CustomTemplateView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_id'] = self.create_user_id()
        return context

    def render_to_response(self, context, **response_kwargs):
        response = super().render_to_response(context, **response_kwargs)
        response.set_cookie('user_id', context['user_id'])
        return response

    def create_user_id(self):
        return str(uuid.uuid4())


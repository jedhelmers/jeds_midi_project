from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.views.generic import TemplateView
# from rest_framework.decorators import api_view
# from .models import Note
# from .models import Song
# from .tasks import save_song_to_db

import json
# from .serializers import SongSerializer, MidiUpdateSerializer
import uuid

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


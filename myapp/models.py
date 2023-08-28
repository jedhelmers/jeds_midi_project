from django.db import models
import uuid

class SequenceMatrix(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(default=uuid.uuid4, editable=True)
    date_created = models.DateTimeField(auto_now_add=True)
    sequence_matrix = models.TextField(help_text="Matrix of 1s and 0s")

    def __str__(self):
        return str(self.id)

# python3 manage.py makemigrations myapp
# python3 manage.py migrate

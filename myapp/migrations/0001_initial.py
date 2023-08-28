# Generated by Django 4.2.4 on 2023-08-28 13:20

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SequenceMatrix",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("user_id", models.UUIDField(default=uuid.uuid4)),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("sequence_matrix", models.TextField(help_text="Matrix of 1s and 0s")),
            ],
        ),
    ]

from django.db import models

class Example(models.Model):
    title = models.CharField(max_length=128, null=False, blank=False, unique=True)
    date_added = models.DateField(auto_now_add=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(max_length=5000)
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Example',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=128, unique=True)),
                ('date_added', models.DateField(auto_now_add=True)),
                ('image', models.CharField(max_length=255, null=True, blank=True)),
                ('description', models.TextField(max_length=5000)),
            ],
        ),
    ]

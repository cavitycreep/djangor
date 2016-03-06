from django.shortcuts import render
from react.render import render_component
from rest_framework import generics
from .models import Example
from .serializers import ExampleSerializer

def index(request):
    component = render_component(
        path="js/example/component.js",
        props={
            "url": "/api/all/?format=json",
            "pollInterval": "100000",
        }
    )
    return render(request, "example/index.html", {"markup": component.markup, })

class ExampleList(generics.ListAPIView):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

class ExampleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

from django.shortcuts import render
from react.render import render_component
from rest_framework import generics
from .models import Example
from .serializers import ExampleSerializer

def index(request):
    component = render_component(
        path="js/example/component.js",
        props={
            "examples": [
                {"title": "Test1"},
                {"image": "https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg"},
                {"description": "This is only a test..."},
                ]
        }
    )
    return render(request, "example/index.html", {"markup": component.markup, })

class ExampleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

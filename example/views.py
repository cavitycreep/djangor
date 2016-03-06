from django.shortcuts import render
from react.render import render_component
from rest_framework import generics
from .models import Example
from .serializers import ExampleSerializer
from django.template.context_processors import csrf

def index(request):
    token = {}
    token.update(csrf(request))
    token = token["csrf_token"].__str__()

    component = render_component(
        path="js/example/component.js",
        props={
            "url": "/api/all/",
            "pollInterval": "100000",
            "token": token,
        }
    )

    return render(request, "example/index.html", {"markup": component.markup, })

class ExampleList(generics.ListCreateAPIView):
    queryset = Example.objects.all().order_by("-date_added")
    serializer_class = ExampleSerializer

class ExampleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

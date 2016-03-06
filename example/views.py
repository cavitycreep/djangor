from django.shortcuts import render
from react.render import render_component

def index(request):
    component = render_component("js/example/_component.babel.js", {})
    return render(request, "example/index.html", {"markup": component.markup, })
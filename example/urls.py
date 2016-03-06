from django.conf.urls import url
from example import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.index),
    url(r'^api/(?P<pk>\d+)/$', views.ExampleDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
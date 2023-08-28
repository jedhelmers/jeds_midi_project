"""
URL configuration for myapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.views import serve
from django.urls import re_path
from django.conf import settings
from django.conf.urls.static import static
import myapp.views as views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.CustomTemplateView.as_view(), name='home'),
    path('save_sequence/', views.save_sequence, name='save_sequence'),
    re_path(r'^static/(?P<path>.*)$', serve),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

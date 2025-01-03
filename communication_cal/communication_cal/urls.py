"""
URL configuration for communication_cal project.

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
from django.contrib import admin
from django.urls import path,include
from app1.views import *
from rest_framework.routers import DefaultRouter
from app1.views import CompanyViewSet, CommunicationMethodViewSet,CommunicationViewSet, CommunicationScheduleViewSet,CompanyDetailView

router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'communication-methods', CommunicationMethodViewSet)
router.register(r'communications', CommunicationViewSet)
router.register(r'communication_schedule', CommunicationScheduleViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('first_page/',first_page),
    path('api/', include(router.urls)),
    path('api/companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),
    #path('companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),
]

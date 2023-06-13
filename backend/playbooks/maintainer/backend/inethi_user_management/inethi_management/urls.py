"""inethi_management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
# test
urlpatterns = [
    path('admin/', admin.site.urls),
    path('userlimits/', views.check_payment_user_limit),
    path('defaultlimits/', views.check_payment_default_limit),
    path('purchase/', views.purchase),
    path('userdata/', views.request_user_data),
    path('registeruser/', views.register_user),
    path('services/', views.request_services),  # list services
    path('latestpurchase/', views.get_latest_purchase),
    path('latestpurchasetimedif/', views.get_time_since_last_purchase),
    path('latestpurchases/', views.get_last_payments_by_time_period),
    path('getuserpayments/<str:user>', views.get_user_payments),
    path('getdefaultlimits/', views.get_default_limits),
    path('getuserlimits/<str:user>', views.check_payment_user_limit)

]

urlpatterns = format_suffix_patterns(urlpatterns)

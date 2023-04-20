from django.contrib import admin
from .models import *

admin.site.register(ServiceTypes)
admin.site.register(Payment)
admin.site.register(Users)
admin.site.register(UserPaymentLimits)
admin.site.register(Service)
admin.site.register(DefaultPaymentLimits)
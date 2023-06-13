from rest_framework import serializers, generics
from .models import *


class ServiceTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTypes
        fields = [
            'description',
            'pay_type',
            'service_type_id'
        ]


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [
            'keycloak_id',
            'email_encrypt',
            'phonenum_encrypt',
            'joindate_time'
        ]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'user_id',
            'payment_method',
            'amount',
            'paydate_time',
            'service_type_id',
            'service_period_sec',
            'package',
            'voucher'

        ]


class UserPaymentLimitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPaymentLimits
        fields = [
            'user_id',
            'service_type_id',
            'payment_method',
            'payment_limit',
            'payment_limit_period_sec',
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'user_id',
            'service_type_id',
            'user_encrypt',
            'pass_encrypt',
            'join_datetime',
            'misc1',
            'misc2'
        ]


class DefaultPaymentLimitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultPaymentLimits
        fields = [
            'service_type_id',
            'payment_method',
            'payment_limit',
            'payment_limit_period_sec',
        ]

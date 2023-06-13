from django.db import models
from django.utils.translation import gettext_lazy as _


class PaymentMethods(models.IntegerChoices):
    FREE = 0, _('FREE')
    CASH = 1, _('Cash')
    ONEFORYOU = 2, _('One4You')
    CIC = 4, _('CIC')
    PAYPAL = 8, _('Paypal')
    CREDITCARD = 16, _('Credit Card')


class ServiceTypes(models.Model):
    class PayTypes(models.TextChoices):
        FREE = 'FR', _('FREE')
        PAID = 'PA', _('PAID')

    description = models.CharField(max_length=100)
    pay_type = models.CharField(
        max_length=2,
        choices=PayTypes.choices,
        default=PayTypes.FREE
    )
    service_type_id = models.IntegerField()

    def __str__(self):
        return str(self.description)


class Users(models.Model):
    keycloak_id = models.CharField(
        max_length=100, unique=True, null=True, blank=True)
    email_encrypt = models.CharField(max_length=100, null=True, blank=True)
    phonenum_encrypt = models.CharField(max_length=100, null=True, blank=True)
    joindate_time = models.DateTimeField()


class UserPaymentLimits(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    service_type_id = models.IntegerField()
    payment_method = models.IntegerField(
        choices=PaymentMethods.choices
    )
    payment_limit = models.IntegerField()
    payment_limit_period_sec = models.IntegerField()

    def __str__(self):
        return str(self.user_id)


class Payment(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    payment_method = models.IntegerField(
        choices=PaymentMethods.choices
    )
    service_type_id = models.IntegerField()
    amount = models.IntegerField()
    paydate_time = models.DateTimeField()
    service_period_sec = models.IntegerField()
    package = models.CharField(max_length=100, null=True)
    voucher = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.user_id)


class Service(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    service_type_id = models.IntegerField()
    user_encrypt = models.CharField(max_length=100)
    pass_encrypt = models.CharField(max_length=100)
    join_datetime = models.DateTimeField()
    misc1 = models.CharField(max_length=100, null=True, blank=True)
    misc2 = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.service_type_id)


class DefaultPaymentLimits(models.Model):
    service_type_id = models.IntegerField()
    payment_method = models.IntegerField(
        choices=PaymentMethods.choices
    )
    payment_limit = models.IntegerField()
    payment_limit_period_sec = models.IntegerField()

    def __str__(self):
        return str(self.service_type_id)

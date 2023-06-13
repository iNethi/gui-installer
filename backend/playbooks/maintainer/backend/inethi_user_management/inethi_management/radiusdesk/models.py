from django.db import models


class Vouchers(models.Model):
    name = models.CharField(unique=True, max_length=64, blank=True, null=True)
    batch = models.CharField(max_length=128)
    status = models.CharField(max_length=8, blank=True, null=True)
    perc_time_used = models.IntegerField(blank=True, null=True)
    perc_data_used = models.IntegerField(blank=True, null=True)
    last_accept_time = models.DateTimeField(blank=True, null=True)
    last_reject_time = models.DateTimeField(blank=True, null=True)
    last_accept_nas = models.CharField(max_length=128, blank=True, null=True)
    last_reject_nas = models.CharField(max_length=128, blank=True, null=True)
    last_reject_message = models.CharField(
        max_length=255, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    created = models.DateTimeField()
    modified = models.DateTimeField()
    extra_name = models.CharField(max_length=100)
    extra_value = models.CharField(max_length=100)
    password = models.CharField(max_length=30)
    realm = models.CharField(max_length=50)
    realm_id = models.IntegerField(blank=True, null=True)
    profile = models.CharField(max_length=50)
    profile_id = models.IntegerField(blank=True, null=True)
    expire = models.DateTimeField(blank=True, null=True)
    time_valid = models.CharField(max_length=10)
    data_used = models.BigIntegerField(blank=True, null=True)
    data_cap = models.BigIntegerField(blank=True, null=True)
    time_used = models.IntegerField(blank=True, null=True)
    time_cap = models.IntegerField(blank=True, null=True)
    issued = models.DateTimeField(blank=True, null=True)
    paytype = models.CharField(max_length=10, blank=True, null=True)
    voucher_pin = models.CharField(max_length=120, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    amount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vouchers'

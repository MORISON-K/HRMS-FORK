from django.contrib import admin
from .models import Transfer

@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    list_display  = ["employee","transfer_type","from_department","to_department","effective_date","status"]
    list_filter   = ["status","transfer_type"]
    search_fields = ["employee__employee_id","employee__user__first_name"]
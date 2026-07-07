from django.contrib import admin
from .models import LeaveType, LeaveBalance, LeaveRequest, LeaveApproval

@admin.register(LeaveType)
class LeaveTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "days_allowed", "is_paid", "carry_forward"]

@admin.register(LeaveBalance)
class LeaveBalanceAdmin(admin.ModelAdmin):
    list_display = ["employee", "leave_type", "year", "total_days", "used_days"]
    list_filter  = ["year", "leave_type"]

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display  = ["employee", "leave_type", "start_date", "end_date", "days_requested", "status"]
    list_filter   = ["status", "leave_type"]
    search_fields = ["employee__employee_id", "employee__user__first_name"]

@admin.register(LeaveApproval)
class LeaveApprovalAdmin(admin.ModelAdmin):
    list_display = ["leave_request", "approver", "decision", "level", "decided_at"]
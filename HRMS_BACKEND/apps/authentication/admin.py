from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display  = ['username', 'email', 'role', 'is_active', 'date_joined']
    list_filter   = ['role', 'is_active', 'is_staff']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering      = ['-date_joined']
    fieldsets = (
        (None,           {'fields': ('username', 'password')}),
        ('Personal',     {'fields': ('first_name', 'last_name', 'email', 'phone', 'profile_photo')}),
        ('Role & Access',{'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Permissions',  {'fields': ('groups', 'user_permissions')}),
        ('Dates',        {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {'classes': ('wide',), 'fields': ('username', 'email', 'role', 'password1', 'password2')}),
    )
    readonly_fields = ['date_joined']